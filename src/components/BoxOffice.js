import React from 'react';

import {
    TwitterTimelineEmbed,
    TwitterShareButton,
    TwitterFollowButton,
    TwitterHashtagButton,
    TwitterMentionButton,
    TwitterTweetEmbed,
    TwitterMomentShare,
    TwitterDMButton,
    TwitterVideoEmbed,
    TwitterOnAirButton
} from 'react-twitter-embed';
import { Stack, List, ListItem } from '@mui/material';

import axios from 'axios';

import DashboardCard from './DashboardCard/DashboardCard';
import Spinner from './Loader/Spinner';

// CSS
import './BoxOffice.css';

export default class BoxOffice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movie_list: [],
            selectedMovieID: '',
            tweetIDs: [],
            loaded: false
        };
    }

    async componentDidMount() {
        await axios.get(`https://twitter-imdb-cloud-app.azurewebsites.net/box_office_top_movies`)
            .then((obj) => {
                let movie_list = obj['data']['movie_list']
                this.setState({ selectedMovieID: movie_list[0]['id'] })
                this.setState({ movie_list: movie_list });
            })
        let url = `https://twitter-imdb-cloud-app.azurewebsites.net/movie_related_tweets?movie_id=` + this.state.selectedMovieID;
        await axios.get(url)
            .then((obj) => {
                this.setState({ tweetIDs: obj['data']['movie_list'] });
            })
        this.setState({ loaded: true });
    }

    changeMovieID = async (movieID) => {
        this.setState({ loaded: false });
        let url = `https://twitter-imdb-cloud-app.azurewebsites.net/movie_related_tweets?movie_id=` + movieID;
        await axios.get(url)
            .then((obj) => {
                this.setState({ selectedMovieID: movieID })
                this.setState({ tweetIDs: obj['data']['movie_list'] });
            })
        this.setState({ loaded: true });
    }

    render() {
        const { loaded, movie_list, tweetIDs } = this.state;
        if (!loaded) {
            return (
                <Spinner />
            )
        } else {
            return (
                <div>
                    <div>
                        <List component={Stack} direction="row">
                            {
                                movie_list.map((movie) => (
                                    <ListItem key={movie['id']}>
                                        <div key={movie['id']} onClick={() => this.changeMovieID(movie['id'])}>
                                            <DashboardCard image={movie['image']} rank={movie['rank']} gross={movie['gross']} />
                                        </div>
                                    </ListItem>
                                ))
                            }
                        </List>
                    </div>
                    <div className='tweetContainer'>
                        <List component={Stack} direction="column">
                            {
                                tweetIDs.map((tweetID) => (
                                    <ListItem key={tweetID}>
                                        <div key={tweetID}>
                                            <TwitterTweetEmbed
                                                tweetId={tweetID}
                                                options={{ height: 400, width: 1000 }}
                                            />
                                        </div>
                                    </ListItem>
                                ))
                            }
                        </List>
                    </div>
                </div>
            )
        }
    }
}