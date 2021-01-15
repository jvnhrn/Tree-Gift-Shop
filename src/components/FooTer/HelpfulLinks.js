import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Link} from "react-router-dom";

function HelpfulLinks(){
    return(
        <>
            
                <h5>Helpful Links</h5><br/>
            
            <Row>
            <Col md={6} className="links">
                <p>
                    <a href="#faq">Help & FAQ</a>
                </p>
                <p>
                    <a href="#impressum">Legal notice</a>
                </p>
                <p>
                    <Link to="/about">About us</Link>
                </p>
            </Col>

            <Col md={6} className="links">
                <p>
                    <a href="#tos">Terms of Service</a>
                </p>
                <p>
                    <a href="#jobs">Join our team</a>
                </p>
                <p>
                    <a href="#sfarmers">Become a farmer</a>
                </p>
            </Col>
            </Row>
        </>
        
    );
};

export default HelpfulLinks;