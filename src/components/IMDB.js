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

import axios from 'axios';

export default class IMDB extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movie_list: [],
            tweetIds: []
        };
    }

    componentDidMount() {
        axios.get(`https://clooud-project-twitter-app.azurewebsites.net/box_office_top_movies`)
            .then((obj) => {
                let movie_list = obj['data']['movie_list']
                // let tweetIds = []
                // for (let i = 0; i < movie_list.length; i++) {
                //     tweetIds.push(movie_list[i]['id'])
                // }
                this.setState({ movie_list: movie_list })
            })
    }

    render() {
        const { movie_list } = this.state;
        if (movie_list.length > 0) {
            console.log(movie_list)
            const listItems = movie_list.map((movie) =>
                <li>
                    {
                        <div>
                            <p>{movie['title']}</p>
                            <img src={movie['image']}/>
                            <p>Rank: {movie['rank']}</p>
                            <p>Box Office: {movie['gross']}</p>
                        </div>
                    }
                </li>
            );
            return (
                <ul>{listItems}</ul>
            )
        } else {
            return (
                <div>
                    <TwitterTweetEmbed
                        tweetId={'1514813553177362434'}
                        options={{ height: 800 }}
                    />
                    <TwitterTimelineEmbed
                        sourceType="profile"
                        screenName="saurabhnemade"
                        options={{ height: 800 }}
                    />
                    <TwitterHashtagButton
                        tag={'imdb'}
                    />
                </div>
            )
        }
    }
}