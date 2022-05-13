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
import DonutChart from 'react-donut-chart';
import axios from 'axios';

import DashboardCard from './DashboardCard/DashboardCard';
import FetchTweetsButton from './FetchTweetsButton/FetchTweetsButton';
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
            etags: [],
            loaded: false,
            showButton: false,
            pieChartData: []
        };
    }

    async componentDidMount() {
        await axios.get(`https://twitter-imdb-cloud-app.azurewebsites.net/box_office_top_movies`)
            .then((obj) => {
                const movie_list = obj['data']['movie_list']
                this.setState({ selectedMovieID: movie_list[0]['id'] })
                this.setState({ movie_list: movie_list });
            });
        const emotion_url = `https://twitter-imdb-cloud-app.azurewebsites.net/movie_related_tweets_emojis?movie_id=tt9419884`
        await axios.get(emotion_url)
            .then((obj) => {
                const pieChartData = [
                    {label: 'joy', value: Number(obj["data"]["sentiment_percentage"]["sentiments"]["senti_joy"].toFixed(2))},
                    {label: 'anger', value: Number(obj["data"]["sentiment_percentage"]["sentiments"]["senti_anger"].toFixed(2))},
                    {label: 'fear', value: Number(obj["data"]["sentiment_percentage"]["sentiments"]["senti_fear"].toFixed(2))},
                    {label: 'love', value: Number(obj["data"]["sentiment_percentage"]["sentiments"]["senti_love"].toFixed(2))},
                    {label: 'sadness', value: Number(obj["data"]["sentiment_percentage"]["sentiments"]["senti_sadness"].toFixed(2))},
                    {label: 'surprise', value: Number(obj["data"]["sentiment_percentage"]["sentiments"]["senti_surprise"].toFixed(2))}
                ]
                
                // const pieChartData = obj["data"]["sentiment_percentage"].map((val, i) => ({ label: val["label"], value: Number((val["score"] * 100).toFixed(2)) }));
                this.setState({ pieChartData: [...pieChartData] })
                console.log('pie,', this.state.pieChartData)
            })
        const url = `https://twitter-imdb-cloud-app.azurewebsites.net/movie_related_tweets?movie_id=` + this.state.selectedMovieID;
        await axios.get(url)
            .then((obj) => {
                this.setState({ tweetIDs: obj['data']['movie_list'] });
                this.setState({ etags: obj['data']['etags'] });
            });
        this.setState({ loaded: true });

        this.checkNewTweets();
        this.checkNewTweets = this.checkNewTweets.bind(this);
        setInterval(this.checkNewTweets, 3000);
    }

    checkNewTweets = async () => {
        const url = `https://twitter-imdb-cloud-app.azurewebsites.net/movie_related_tweets?movie_id=` + this.state.selectedMovieID;
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
        const url = `https://twitter-imdb-cloud-app.azurewebsites.net/movie_related_tweets?movie_id=` + this.state.selectedMovieID;
        await axios.get(url)
            .then((obj) => {
                this.setState({ tweetIDs: obj['data']['movie_list'] });
                this.setState({ etags: obj['data']['etags'] });
            });
    }

    changeMovieID = async (movieID) => {
        this.setState({ loaded: false });
        const tweets_url = `https://twitter-imdb-cloud-app.azurewebsites.net/movie_related_tweets?movie_id=` + movieID;

        await axios.get(tweets_url)
            .then((obj) => {
                this.setState({ selectedMovieID: movieID })
                this.setState({ tweetIDs: obj['data']['movie_list'] });
                this.setState({ etags: obj['data']['etags'] });
            })
        this.setState({ loaded: true });

        const emotion_url = `https://twitter-imdb-cloud-app.azurewebsites.net/movie_related_tweets_emojis?movie_id=` + this.state.selectedMovieID
        await axios.get(emotion_url)
            .then((obj) => {
                const pieChartData = [
                    {label: 'joy', value: Number(obj["data"]["sentiment_percentage"]["sentiments"]["senti_joy"].toFixed(2))},
                    {label: 'anger', value: Number(obj["data"]["sentiment_percentage"]["sentiments"]["senti_anger"].toFixed(2))},
                    {label: 'fear', value: Number(obj["data"]["sentiment_percentage"]["sentiments"]["senti_fear"].toFixed(2))},
                    {label: 'love', value: Number(obj["data"]["sentiment_percentage"]["sentiments"]["senti_love"].toFixed(2))},
                    {label: 'sadness', value: Number(obj["data"]["sentiment_percentage"]["sentiments"]["senti_sadness"].toFixed(2))},
                    {label: 'surprise', value: Number(obj["data"]["sentiment_percentage"]["sentiments"]["senti_surprise"].toFixed(2))}
                ]
                
                // const pieChartData = obj["data"]["sentiment_percentage"].map((val, i) => ({ label: val["label"], value: Number((val["score"] * 100).toFixed(2)) }));
                this.setState({ pieChartData: [...pieChartData] })
                console.log('pie,', this.state.pieChartData)
            })
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
                                                <DashboardCard image={movie['image']} rank={movie['rank']} gross={movie['gross']} />
                                            </div>
                                        </ListItem>
                                    ))
                                }
                            </List>
                        </Paper>
                    </div>
                    <FetchTweetsButton handleClick={() => this.fetchNewTweets()} showButton={this.state.showButton}></FetchTweetsButton>
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
                                                <p className='textCenter'>Emoji Sentiment: {etags[tweetIDs.indexOf(tweetID)]}</p>
                                            </div>
                                        </ListItem>
                                    ))
                                }
                            </List>
                        </Paper>
                    </div>
                    {<DonutChart
                        data={this.state.pieChartData}
                    />}
                </div>
            )
        }
    }
}