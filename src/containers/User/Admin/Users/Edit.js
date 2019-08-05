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
                valid: true,
                touched: true,
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
                valid: true,
                touched: true,
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
                touched: true,
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
                valid: true,
                touched: true
            },
            image: {
                elementConfig: {
                    type: 'file',
                    label: 'Photo'
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
        const { onAuthPageOff, onUserPageOn, onEditUser, onCreateUser, auth: { authPage, userPage }, match: { params: { userId } } } = this.props;
        if (authPage) onAuthPageOff();
        if (!userPage) onUserPageOn();
        onCreateUser();
        onEditUser(userId);
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.admin.roles.length !== 0) {
            nextState = { ...this.state };
            nextState.controls.roleId.elementConfig.options.array = [...nextProps.admin.roles];
        }
        if (nextProps.admin.user !== this.props.admin.user) {
            nextState = { ...this.state };
            Object.keys(nextState.controls).forEach(control => {
                nextState.controls[control].value = nextProps.admin.user[control];
            });
            nextState.controls.roleId.value = nextProps.admin.user.roleId;
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
            this.props.onUpdateUser(data, this.props.match.params.userId);
            this.setState({ formSubmitted: true, formError: false });
        }
        else this.setState({ formError: true });
    }

    render() {
        const { controls, formValid, formError, formLoading, formSubmitted } = this.state;
        const { auth: { error: authError, loading: authLoading }, admin: { error: adminError, userLoading: adminLoading, roleLoading } } = this.props;

        let redirect = null;
        if (formSubmitted && !(formLoading || authLoading || adminLoading || roleLoading) && !(formError || authError || adminError)) redirect = <Redirect to="/admin/users" />

        let globalError = null;
        if (!formValid && formError) globalError = "Veuillez vérifier vos informations.";

        let errors = <>
            <Error err={globalError} />
            <Error err={adminError} />
            <Error err={authError} />
        </>;

        let form = null;
        if (formLoading || authLoading || adminLoading || roleLoading) form = <div className="text-center"><Spinner type="grow" style={{ width: '5rem', height: '5rem' }} color="danger" /></div>;
        else {
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
                    {globalError ? <div className="alert alert-danger">{globalError}</div> : null}
                    {authError ? <div className="alert alert-danger">{authError.message}</div> : null}
                    {adminError ? <div className="alert alert-danger">{adminError.message}</div> : null}
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
                <Breadcrumb main="Modifier un utilisateur" icon="edit" />
                <PresentationalContainer user bg="light">
                    <SpecialTitle user icon="edit">Modifier un utilisateur</SpecialTitle>
                    <Subtitle>Ici, vous pouvez modifier un utilisateur de l'application.</Subtitle>
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
    onEditUser: userId => dispatch(actions.adminEditUser(userId)),
    onUpdateUser: (data, userId) => dispatch(actions.adminUpdateUser(data, userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Update);