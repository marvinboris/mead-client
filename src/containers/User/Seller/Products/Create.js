import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Form, FormGroup, Button, Spinner } from 'reactstrap';

import Input from '../../../../components/UI/Input/Input';
import Breadcrumb from '../../../../components/Admin/UI/Breadcrumb/Breadcrumb';
import PresentationalContainer from '../../../../components/UI/PresentationalContainer/PresentationalContainer';
import SpecialTitle from '../../../../components/UI/Titles/SpecialTitle/SpecialTitle';
import Subtitle from '../../../../components/UI/Titles/Subtitle/Subtitle';
import Error from '../../../../components/Error/Error';
import * as actions from '../../../../store/actions';
import { updateObject, checkValidity } from '../../../../shared/utility';

class Create extends Component {
    state = {
        formValid: false,
        formError: false,
        formLoading: false,
        formSubmitted: false,
        controls: {
            title: {
                elementConfig: {
                    type: 'text',
                    label: 'Titre',
                    autoFocus: true
                },
                icon: 'heading',
                value: '',
                validation: {
                    required: true,
                    minLength: 3,
                },
                valid: false,
                touched: false,
            },
            description: {
                elementConfig: {
                    type: 'textarea',
                    label: 'Description'
                },
                icon: 'paragraph',
                value: '',
                validation: {
                    required: true,
                    maxLength: 200
                },
                valid: false,
                touched: false,
            },
            price: {
                elementConfig: {
                    type: 'number',
                    label: 'Prix'
                },
                icon: 'tag',
                value: '',
                validation: {
                    required: true,
                    isNumeric: true
                },
                valid: false,
                touched: false,
            },
            quantity: {
                elementConfig: {
                    type: 'number',
                    label: 'Quantité'
                },
                icon: 'tag',
                value: '',
                validation: {
                    required: true,
                    isNumeric: true
                },
                valid: false,
                touched: false,
            },
            size: {
                elementConfig: {
                    type: 'text',
                    label: 'Taille (S/M/L/XL/XXL ou un nombre pour des chaussures)'
                },
                icon: 'tag',
                value: '',
                validation: {},
                valid: true,
                touched: false,
            },
            color: {
                elementConfig: {
                    type: 'color',
                    label: 'Couleur'
                },
                icon: 'palette',
                value: '#000000',
                validation: {},
                valid: true,
                touched: false,
            },
            brand: {
                elementConfig: {
                    type: 'text',
                    label: 'Marque'
                },
                icon: 'building',
                value: '',
                validation: {},
                valid: true,
                touched: false,
            },
            delivery: {
                elementConfig: {
                    type: 'number',
                    label: 'Délai de livraison (en jours)'
                },
                icon: 'truck-loading',
                value: '',
                validation: {},
                valid: true,
                touched: false,
            },
            image: {
                elementConfig: {
                    type: 'file',
                    label: 'Image du produit'
                },
                icon: 'image',
                value: '',
                validation: {
                    required: true
                },
                valid: true,
                touched: false
            }
        }
    }

    componentDidMount() {
        const { onAuthPageOff, onUserPageOn, auth: { authPage, userPage } } = this.props;
        if (authPage) onAuthPageOff();
        if (!userPage) onUserPageOn();
    }

    componentWillUnmount() {
        this.props.onAdminReset();
    }

    inputChangedHandler = (event) => {
        const { files, name, value } = event.target;
        const { controls } = this.state;
        this.setState(updateObject(this.state, {
            controls: updateObject(controls, {
                [name]: updateObject(controls[name], {
                    value: files ? files[0] : value,
                    valid: checkValidity(value, controls[name].validation),
                    touched: true
                })
            })
        }));

        let formValid = true;
        for (const key in controls) {
            if (controls.hasOwnProperty(key)) {
                const element = controls[key];
                formValid = formValid && element.valid;
            }
        }
        this.setState({ formValid, formSubmitted: false, formError: false });
    }

    submitHandler = event => {
        const { formValid, controls } = this.state;
        event.preventDefault();
        const data = {};

        for (const key in controls) {
            if (controls.hasOwnProperty(key)) {
                const element = controls[key];
                data[key] = element.value;
            }
        }

        if (formValid) {
            this.props.onAuthErrorReset();
            this.props.onStoreProduct(data);
            this.setState({ formSubmitted: true, formError: false });
        }
        else this.setState({ formError: true });
    }

    render() {
        const { controls, formValid, formError, formLoading, formSubmitted } = this.state;
        const { auth: { error: authError, loading: authLoading }, admin: { error: adminError, productLoading: adminLoading } } = this.props;
        let errors = null;

        let redirect = null;
        if (formSubmitted && !(formLoading || authLoading || adminLoading) && !(formError || authError || adminError)) redirect = <Redirect to="/community/products" />

        let globalError = null;
        if (!formValid && formError) globalError = "Veuillez vérifier vos informations";

        errors = <>
            <Error err={globalError} />
            <Error err={authError} />
            <Error err={adminError} />
        </>;

        const formContent = Object.keys(controls).map(control => (
            <Input
                key={control}
                value={controls[control].value}
                onChange={event => this.inputChangedHandler(event)}
                name={control}
                icon={controls[control].icon}
                className={controls[control].elementConfig.className}
                check={['radio', 'checkbox'].includes(controls[control].elementConfig.type)}
                select={controls[control].elementConfig.type === 'select'}
                file={controls[control].elementConfig.type === 'file'}
                options={controls[control].elementConfig.options}
                required={controls[control].validation.required}
                type={controls[control].elementConfig.type}
                invalid={!controls[control].valid}
                touched={controls[control].touched}
                shouldValidate={controls[control].validation ? true : false}
                autoFocus={controls[control].elementConfig.autoFocus}>{controls[control].elementConfig.label}</Input>
        ));

        let form = (
            <>
                <Form onSubmit={event => this.submitHandler(event)}>
                    {formContent}
                    <FormGroup>
                        <Button color="danger">Créer<FontAwesomeIcon icon="cart-plus" size="lg" className="ml-1" /></Button>
                    </FormGroup>
                </Form>
            </>
        );
        if (formLoading || authLoading || adminLoading) form = <div className="text-center"><Spinner type="grow" style={{ width: '5rem', height: '5rem' }} color="danger" /></div>;

        return (
            <Col xs={12} className="p-0">
                {redirect}
                <Breadcrumb main="Ajouter un produit" icon="cart-plus" items={[{ to: '/community', content: 'Ma communauté' }]} />
                <PresentationalContainer user bg="light">
                    <SpecialTitle user icon="cart-plus">Ajouter un produit</SpecialTitle>
                    <Subtitle>Ici, vous pouvez créer un nouveau produit et l'ajouter à l'application.</Subtitle>
                    {errors}
                    {form}
                </PresentationalContainer>
            </Col>
        );
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    onAuthPageOff: () => dispatch(actions.authPageOff()),
    onUserPageOn: () => dispatch(actions.userPageOn()),
    onAuthErrorReset: () => dispatch(actions.authErrorReset()),
    onAdminReset: () => dispatch(actions.adminReset()),
    onStoreProduct: data => dispatch(actions.adminStoreProduct(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Create);