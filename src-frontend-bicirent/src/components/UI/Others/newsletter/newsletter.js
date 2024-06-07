import React from 'react'

import './newsletter.css'
import PrimaryButton from '../../Button/PrimaryButton/primaryButton'

const Newsletter = (props) => {
    return (
        <div className="newsletter-container">
            <div className="newsletter-containersectionnewsletter">
                <div className="newsletter-containernewsletter">
                    <div className="newsletter-containernewslettertexts">
                        <div className="newsletter-containernewslettertext">
                            <div className="newsletter-containernewslettertexttitle">
                                <span className="newsletter-text">
                                    <span className="newsletter-text1">
                                        Suscríbete a Nuestro Boletín
                                    </span>
                                    <span>
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: ' ',
                                            }}
                                        />
                                    </span>
                                </span>
                            </div>
                            <div className="newsletter-containernewslettertextsubtitle">
                                <span className="newsletter-text3">
                                    <span>Obtén las últimas noticias y ofertas</span>
                                    <br></br>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="newsletter-containernewsletterbuttoms">
                        <PrimaryButton to="/" >Suscríbete</PrimaryButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Newsletter
