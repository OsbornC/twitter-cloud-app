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
import { Stack, List, ListItem, Paper } from '@mui/material';

import axios from 'axios';

import TopRatedCard from './DashboardCard/TopRatedCard';
import FetchTweetsButton from './FetchTweetsButton/FetchTweetsButton';
import Spinner from './Loader/Spinner';

// CSS
import './TopRated.css';

export default class TopRated extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movie_list: [],
            selectedMovieID: '',
            etags: [],
            tweetIDs: [],
            loaded: false,
            showButton: false
        };
    }

    async componentDidMount() {
        await axios.get(`https://twitter-imdb-cloud-app.azurewebsites.net/top_rated_movies`)
            .then((obj) => {
                let movie_list = obj['data']['movie_list']
                this.setState({ selectedMovieID: movie_list[0]['id'] })
                this.setState({ movie_list: movie_list });
            });
        const url = `https://twitter-imdb-cloud-app.azurewebsites.net/top_movie_related_tweets?movie_id=` + this.state.selectedMovieID;
        await axios.get(url)
            .then((obj) => {
                this.setState({ tweetIDs: obj['data']['movie_list'] });
                this.setState({ etags: obj['data']['etags'] });
            });
        this.setState({ loaded: true });

        // this.checkNewTweets();
        // this.checkNewTweets = this.checkNewTweets.bind(this);
        // setInterval(this.checkNewTweets, 3000);
    }

    checkNewTweets = async () => {
        const url = `https://twitter-imdb-cloud-app.azurewebsites.net/top_movie_related_tweets?movie_id=` + this.state.selectedMovieID;
        await axios.get(url)
            .then((obj) => {
                if (this.state.tweetIDs[0] !== obj['data']['movie_list'][0]) {
                    console.log('tweet ID check', this.state.tweetIDs[0], obj['data']['movie_list'][0])
                    this.setState({ showButton: true });
                }
            });
    }

    fetchNewTweets = async () => {
        this.setState({ showButton: false });
        const url = `https://twitter-imdb-cloud-app.azurewebsites.net/top_movie_related_tweets?movie_id=` + this.state.selectedMovieID;
        await axios.get(url)
            .then((obj) => {
                this.setState({ tweetIDs: obj['data']['movie_list'] });
                this.setState({ etags: obj['data']['etags'] });
            });
    }

    changeMovieID = async (movieID) => {
        this.setState({ loaded: false });
        let url = `https://twitter-imdb-cloud-app.azurewebsites.net/top_movie_related_tweets?movie_id=` + movieID;

        await axios.get(url)
            .then((obj) => {
                this.setState({ selectedMovieID: movieID })
                this.setState({ tweetIDs: obj['data']['movie_list'] });
                this.setState({ etags: obj['data']['etags'] });
            })
        this.setState({ loaded: true });
    }

    render() {
        const { loaded, movie_list, tweetIDs, etags } = this.state;
        if (!loaded) {
            return (
                <Spinner />
            )
        } else {
            return (
                <div>
                    <div>
                        <Paper style={{ maxHeight: 600, overflow: 'auto' }}>
                            <List component={Stack} direction="row">
                                {
                                    movie_list.map((movie) => (
                                        <ListItem key={movie['id']}>
                                            <div key={movie['id']} onClick={() => this.changeMovieID(movie['id'])}>
                                                <TopRatedCard image={movie['image']} title={movie['title']} gross={movie['gross']} />
                                            </div>
                                        </ListItem>
                                    ))
                                }
                            </List>
                        </Paper>
                    </div>
                    <h2 className='textCenter'>Top Trending Tweets</h2>
                    <div>
                        <Paper style={{ maxHeight: 600, overflow: 'auto' }}>
                            <List component={Stack} direction="row">
                                {
                                    tweetIDs.map((tweetID) => (
                                        <ListItem key={tweetID}>
                                            <div key={tweetID}>
                                                <TwitterTweetEmbed
                                                    tweetId={tweetID}
                                                    options={{ height: 400, outerWidth: 200 }}
                                                />
                                            </div>
                                        </ListItem>
                                    ))
                                }
                            </List>
                        </Paper>
                    </div>
                </div>
            )
        }
    }
}