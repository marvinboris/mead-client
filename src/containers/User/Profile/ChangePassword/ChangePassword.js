import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Spinner, Form, FormGroup, Col, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Input from '../../../../components/UI/Input/Input';
import Error from '../../../../components/Error/Error';
import * as actions from '../../../../store/actions';
import { updateObject, checkValidity } from '../../../../shared/utility';

class ChangePassword extends Component {
    state = {
        formValid: false,
        formError: false,
        formLoading: false,
        controls: {
            password: {
                elementConfig: {
                    type: 'password',
                    label: 'Mot de passe actuel'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 8
                },
                valid: false,
                touched: false
            },
            newPassword: {
                elementConfig: {
                    type: 'password',
                    label: 'Nouveau mot de passe'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 8
                },
                valid: false,
                touched: false
            },
            confirmedNewPassword: {
                elementConfig: {
                    type: 'password',
                    label: 'Confirmation du nouveau mot de passe'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 8
                },
                valid: false,
                touched: false
            }
        }
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
            this.props.onChangePassword(data);
            this.setState({ formError: false });
        }
        else this.setState({ formError: true });
    }

    render() {
        const { controls, formValid, formError, formLoading } = this.state;
        const { auth: { error: authError, loading: authLoading } } = this.props;

        let globalError = null;
        if (!formValid && formError) globalError = "Veuillez vérifier vos informations.";

        let content = null;
        let errors = <>
            <Error err={globalError} />
            <Error err={authError} />
        </>;

        if (formLoading || authLoading) content = <div className="text-center"><Spinner type="grow" style={{ width: '5rem', height: '5rem' }} color="danger" /></div>;
        else {
            const formContent = Object.keys(controls).map(control => (
                <Input
                    row
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

            content = (
                <>
                    <Form onSubmit={event => this.submitHandler(event)}>
                        {errors}
                        {formContent}
                        <FormGroup check row>
                            <Col sm={{ size: 8, offset: 4 }}>
                                <Button color="danger">
                                    <FontAwesomeIcon icon="user-edit" className="mr-1" />Modifier
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </>
            );
        }

        return content;
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    onChangePassword: data => dispatch(actions.changePassword(data)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChangePassword));