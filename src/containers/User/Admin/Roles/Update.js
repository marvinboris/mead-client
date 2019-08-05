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
                    label: 'Intitulé',
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
            }
        }
    }

    componentDidMount() {
        const { onAuthPageOff, onUserPageOn, onEditRole, auth: { authPage, userPage }, match: { params: { roleId } } } = this.props;
        if (authPage) onAuthPageOff();
        if (!userPage) onUserPageOn();
        onEditRole(roleId);
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.admin.role !== this.props.admin.role) {
            nextState = { ...this.state };
            Object.keys(nextState.controls).forEach(control => {
                nextState.controls[control].value = nextProps.admin.role[control];
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
        this.setState({ formValid });
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
            this.props.onUpdateRole(data, this.props.match.params.roleId);
            this.setState({ formSubmitted: true, formError: false });
        }
        else this.setState({ formError: true });
    }

    render() {
        const { controls, formValid, formError, formLoading, formSubmitted } = this.state;
        const { auth: { error: authError, loading: authLoading }, admin: { error: adminError, roleLoading: adminLoading } } = this.props;

        let redirect = null;
        if (formSubmitted && !(formLoading || authLoading || adminLoading) && !(formError || authError || adminError)) redirect = <Redirect to="/admin/roles" />

        let globalError = null;
        if (!formValid && formError) globalError = "Veuillez vérifier vos informations.";

        let errors = <>
            <Error err={globalError} />
            <Error err={authError} />
            <Error err={adminError} />
        </>;

        let form = null;
        if (formLoading || authLoading || adminLoading) form = <div className="text-center"><Spinner type="grow" style={{ width: '5rem', height: '5rem' }} color="danger" /></div>;
        else {
            const formContent = Object.keys(controls).map(control => (
                <Input
                    key={control}
                    onChange={event => this.inputChangedHandler(event)}
                    name={control}
                    value={controls[control].value}
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
                <Breadcrumb main="Modifier un rôle" icon="edit" />
                <PresentationalContainer user bg="light">
                    <SpecialTitle user icon="edit">Modifier un rôle</SpecialTitle>
                    <Subtitle>Ici, vous pouvez rôle de l'application.</Subtitle>
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
    onEditRole: roleId => dispatch(actions.adminEditRole(roleId)),
    onUpdateRole: (data, roleId) => dispatch(actions.adminUpdateRole(data, roleId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Update);