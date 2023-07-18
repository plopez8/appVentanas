import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

// eslint-disable-next-line react/prefer-stateless-function
class Footer extends Component {
    render() {
        return (
            <footer className="footer px-0">
                <Container fluid>
                    <nav>
                        <p className="copyright text-center">
                            © {new Date().getFullYear()}{' '}
                            <a href="https://www.google.com/">web google.com</a>
                            , CHANGE ME SL.
                        </p>
                    </nav>
                </Container>
            </footer>
        );
    }
}

export default Footer;
