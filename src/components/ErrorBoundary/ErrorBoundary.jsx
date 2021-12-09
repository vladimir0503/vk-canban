import React from 'react';

class ErrorBoundary extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            stack: null,
            message: '',
            showStack: false
        }
    };

    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            stack: error.stack,
            message: error.message
        };
    };

    reloadPage() {
        window.location.reload()
    };

    componentDidCatch(error, errorInfo) {
        // dispatchAnalytic(error);
    };

    render() {
        if (this.state.hasError) {
            return (
                <>
                    <h1>Что-то пошло не так</h1>
                    <button onClick={this.reloadPage}>Перезагрузить</button>
                    <button onClick={() => this.setState({ showStack: true })}>Показать техническую информацию</button>
                    {this.state.showStack && this.state.stack}
                </>
            )
        };

        return this.props.children;
    };
};

export default ErrorBoundary;