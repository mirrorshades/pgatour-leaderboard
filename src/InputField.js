import React from 'react';
import { ValidatorComponent } from 'react-form-validator-core';

class InputField extends ValidatorComponent {
    render() {
        const { errorMessages, validators, requiredError, validatorListener, ...rest } = this.props;

        return (
            <div style={{ position: 'relative', flex: 1, display: 'flex' }}>
                <input
                    {...rest}
                    ref={r => {
                        this.input = r;
                    }}
                />
                {this.errorText()}
            </div>
        );
    }

    errorText() {
        const { isValid } = this.state;

        if (isValid) {
            return null;
        }

        return (
            <div
                style={{
                    background: '#F1DEDE',
                    color: '#A94442',
                    padding: 5,
                    borderRadius: 5,
                    fontSize: 10,
                    fontWeight: 'bold',
                    position: 'absolute',
                    right: '10px',
                    top: '8px',
                }}
            >
                {this.getErrorMessage()}
            </div>
        );
    }
}

export default InputField;
