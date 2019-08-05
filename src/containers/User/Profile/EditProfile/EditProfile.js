import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Spinner, Form, FormGroup, Col, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Input from '../../../../components/UI/Input/Input';
import Error from '../../../../components/Error/Error';
import * as actions from '../../../../store/actions';
import { updateObject, checkValidity } from '../../../../shared/utility';

class EditProfile extends Component {
    state = {
        formValid: true,
        formError: false,
        formLoading: false,
        controls: {
            name: {
                elementConfig: {
                    type: 'text',
                    label: 'Nom(s) & prénom(s)',
                    autoFocus: true
                },
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
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: true,
                touched: true,
            },
            phone: {
                elementConfig: {
                    type: 'tel',
                    label: 'Numéro de téléphone'
                },
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
                value: '',
                validation: {},
                valid: true,
                touched: true
            }
        }
    }

    componentDidMount() {
        this.props.onGetProfile();
    }
    
    componentWillUpdate(nextProps, nextState) {
        if (nextProps.auth.profile !== this.props.auth.profile) {
            nextState = { ...this.state };
            Object.keys(nextState.controls).forEach(control => {
                nextState.controls[control].value = nextProps.auth.profile[control];
            });
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
            this.props.onUpdateProfile(data);
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
    onGetProfile: () => dispatch(actions.getProfile()),
    onUpdateProfile: data => dispatch(actions.postProfile(data)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditProfile));