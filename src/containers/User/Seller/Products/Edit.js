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

class Update extends Component {
    state = {
        formValid: true,
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
                valid: true,
                touched: true,
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
                valid: true,
                touched: true,
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
                valid: true,
                touched: true,
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
                valid: true,
                touched: true,
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
                touched: true,
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
                touched: true,
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
                touched: true,
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
                touched: true,
            },
            image: {
                elementConfig: {
                    type: 'file',
                    label: 'Image du produit'
                },
                icon: 'image',
                value: '',
                validation: {},
                valid: true,
                touched: true
            }
        }
    }

    componentDidMount() {
        const { onAuthPageOff, onUserPageOn, onEditProduct, auth: { authPage, userPage }, match: { params: { productId } } } = this.props;
        if (authPage) onAuthPageOff();
        if (!userPage) onUserPageOn();
        onEditProduct(productId);
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.admin.product !== this.props.admin.product) {
            nextState = { ...this.state };
            Object.keys(nextState.controls).forEach(control => {
                nextState.controls[control].value = nextProps.admin.product[control];
            });
        }
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
            this.props.onUpdateProduct(data, this.props.match.params.productId);
            this.setState({ formSubmitted: true, formError: false });
        }
        else this.setState({ formError: true });
    }

    render() {
        const { controls, formValid, formError, formLoading, formSubmitted } = this.state;
        const { auth: { error: authError, loading: authLoading }, admin: { error: adminError, productLoading: adminLoading, product } } = this.props;

        let redirect = null;
        if (formSubmitted && !(formLoading || authLoading || adminLoading) && !(formError || authError || adminError)) redirect = <Redirect to="/community/products" />

        let globalError = null;
        if (!formValid && formError) globalError = "Veuillez vérifier vos informations";

        let errors = <>
            <Error err={globalError} />
            <Error err={authError} />
            <Error err={adminError} />
        </>;

        let form = null;
        if (formLoading || authLoading || adminLoading) form = <div className="text-center"><Spinner type="grow" style={{ width: '5rem', height: '5rem' }} color="danger" /></div>;
        else if (product) {
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

            form = (
                <>
                    <Form onSubmit={event => this.submitHandler(event)}>
                        {formContent}
                        <FormGroup>
                            <Button color="danger">Modifier<FontAwesomeIcon icon="edit" size="lg" className="ml-1" /></Button>
                        </FormGroup>
                    </Form>
                </>
            );
        }

        return (
            <Col xs={12} className="p-0">
                {redirect}
                <Breadcrumb main="Modifier un produit" icon="edit" items={[{ to: '/community', content: 'Ma communauté' }]} />
                <PresentationalContainer user bg="light">
                    <SpecialTitle user icon="edit">Modifier un produit</SpecialTitle>
                    <Subtitle>Ici, vous pouvez modifier un produit de l'application.</Subtitle>
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
    onEditProduct: productId => dispatch(actions.adminEditProduct(productId)),
    onUpdateProduct: (data, productId) => dispatch(actions.adminUpdateProduct(data, productId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Update);