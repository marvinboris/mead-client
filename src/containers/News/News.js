import React, { Component } from 'react';
import RSSParser from 'rss-parser';
import { Col, Row, Spinner } from 'reactstrap';

import Breadcrumb from '../../components/UI/Breadcrumb/Breadcrumb';
import NewsCard from '../../components/UI/NewsCard/NewsCard';
import Title from '../../components/UI/Title/Title';
import PresentationalContainer from '../../components/UI/PresentationalContainer/PresentationalContainer';

class News extends Component {
    state = {
        data: []
    };

    componentDidMount() {
        const parser = new RSSParser();
        const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"
        const RSS_SOURCE = 'https://cdn-elle.ladmedia.fr/var/plain_site/storage/flux_rss/fluxMode.xml';

        parser.parseURL(CORS_PROXY + RSS_SOURCE)
            .then(res => {
                this.setState(prevState => this.setState({ data: prevState.data.concat(res) }));
            })
            .catch(err => console.log(err));
    }

    render() {
        let { data } = this.state;
        let content = null;

        if (data.length) {
            content = data[0].items.map((item, i) => (
                <NewsCard key={i} src={item.enclosure.url} md={6} lg={4} link={item.link} subtitle={item.pubDate} title={item.title}>{item.content}</NewsCard>
            ));
        }

        return (
            <Col xs={12} className="p-0">
                <Breadcrumb main="Actualités" />
                <PresentationalContainer>
                    {!content ? (
                        <div className="text-center">
                            <Spinner type="grow" color="danger" style={{ width: '5rem', height: '5rem' }} className="mx-auto" size="xl" />
                        </div>
                    ) : (
                        <>
                            <Title className="text-center">Dernières infos sur la mode dans le monde</Title>
                            <Row className="justify-content-center">
                                {content}
                            </Row>
                        </>
                    )}
                </PresentationalContainer>
            </Col>
        );
    }
}

export default News;