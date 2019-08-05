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
            name: {
                elementConfig: {
                    type: 'text',
                    label: 'Nom(s) & prénom(s)',
                    autoFocus: true
                },
                icon: 'signature',
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                },
                valid: false,
                touched: false,
            },
            email: {
                elementConfig: {
                    type: 'email',
                    label: 'Adresse mail'
                },
                icon: 'envelope',
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false,
            },
            roleId: {
                elementConfig: {
                    type: 'select',
                    label: 'Rôle',
                    options: {
                        array: [],
                        value: '_id',
                        name: 'name'
                    }
                },
                icon: 'user-tag',
                value: '',
                validation: {
                    required: true
                },
                valid: true,
                touched: false,
            },
            password: {
                elementConfig: {
                    type: 'password',
                    label: 'Mot de passe'
                },
                icon: 'lock',
                value: '',
                validation: {
                    required: true,
                    minLength: 8
                },
                valid: false,
                touched: false
            },
            phone: {
                elementConfig: {
                    type: 'tel',
                    label: 'Numéro de téléphone'
                },
                icon: 'phone',
                value: '',
                validation: {
                    required: true,
                    minLength: 8
                },
                valid: false,
                touched: false
            },
            image: {
                elementConfig: {
                    type: 'file',
                    label: 'Photo'
                },
                icon: 'image',
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }
        }
    }

    componentDidMount() {
        const { onAuthPageOff, onUserPageOn, onCreateUser, auth: { authPage, userPage } } = this.props;
        if (authPage) onAuthPageOff();
        if (!userPage) onUserPageOn();
        onCreateUser();
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.admin.roles.length !== 0) {
            nextState = { ...this.state };
            nextState.controls.roleId.elementConfig.options.array = [...nextProps.admin.roles];
            nextState.controls.roleId.value = nextProps.admin.roles[0]._id;
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
            this.props.onStoreUser(data);
            this.setState({ formSubmitted: true, formError: false });
        }
        else this.setState({ formError: true });
    }

    render() {
        const { controls, formValid, formError, formLoading, formSubmitted } = this.state;
        const { auth: { error: authError, loading: authLoading }, admin: { error: adminError, roleLoading: adminLoading, roles } } = this.props;

        let redirect = null;
        if (formSubmitted && !(formLoading || authLoading || adminLoading) && !(formError || authError || adminError)) redirect = <Redirect to="/admin/users" />

        let globalError = null;
        if (!formValid && formError) globalError = "Veuillez vérifier vos informations.";

        let errors = <>
            <Error err={globalError} />
            <Error err={authError} />
            <Error err={adminError} />
        </>;

        let form = null;
        if (formLoading || authLoading || adminLoading) form = <div className="text-center"><Spinner type="grow" style={{ width: '5rem', height: '5rem' }} color="danger" /></div>;
        else if (roles.length > 0) {
            const formContent = Object.keys(this.state.controls).map(control => (
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
                    {globalError ? <div className="alert alert-danger">{globalError}</div> : null}
                    {authError ? <div className="alert alert-danger">{authError.message}</div> : null}
                    {adminError ? <div className="alert alert-danger">{adminError.message}</div> : null}
                    <Form onSubmit={event => this.submitHandler(event)}>
                        {formContent}
                        <FormGroup>
                            <Button color="danger">Créer<FontAwesomeIcon icon="user-plus" size="lg" className="ml-1" /></Button>
                        </FormGroup>
                    </Form>
                </>
            );
        }

        return (
            <Col xs={12} className="p-0">
                {redirect}
                <Breadcrumb main="Ajouter un utilisateur" icon="user-plus" />
                <PresentationalContainer user bg="light">
                    <SpecialTitle user icon="user-plus">Ajouter un utilisateur</SpecialTitle>
                    <Subtitle>Ici, vous pouvez créer un nouvel utilisateur et l'ajouter à l'application.</Subtitle>
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
    onCreateUser: () => dispatch(actions.adminCreateUser()),
    onStoreUser: data => dispatch(actions.adminStoreUser(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Create);