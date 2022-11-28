import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, } from "react-native";
import Carousel, { Pagination } from 'react-native-snap-carousel'
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from '../components/CarouselCardItem'
import { getUserReports } from '../redux/actions/reportAction';
import { connect, useDispatch, useSelector } from 'react-redux';

var data = [];

const CarouselCards = ({user}) => {
    const isCarousel = React.useRef(null);
    const [index, setIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const reps = user.reports;
    const dispatch = useDispatch();
    const {reports} = useSelector(state => state.reportList)

    useEffect(() => {
        setIsLoading(true);
        dispatch(getUserReports(reps))
            .then(() => {
                setIsLoading(false);
            })
            .catch(() => setIsLoading(false));
    }, [dispatch]) 
    

    if(reports.length == 1) {
        data = [
            {
                title: reports[0].address,
                body: reports[0].completed,
                uri: reports[0].image,
                id: reports[0]._id
            }
        ]
    } else if (reports.length == 2) {
        data = [
            {
                title: reports[0].address,
                body: reports[0].completed,
                uri: reports[0].image,
                id: reports[0]._id
            },
            {
                title: reports[1].address,
                body: reports[1].completed,
                uri: reports[1].image,
                id: reports[1]._id
            },
        ]
    } else if (reports.length >= 3) {
        data = [
            {
                title: reports[0].address,
                body: reports[0].completed,
                uri: reports[0].image,
                id: reports[0]._id
            },
            {
                title: reports[1].address,
                body: reports[1].completed,
                uri: reports[1].image,
                id: reports[1]._id
            },
            {
                title: reports[2].address,
                body: reports[2].completed,
                uri: reports[2].image,
                id: reports[2]._id
            }
        ]
    }

    return (
        <View style={{marginLeft: -15}}> 
            { !isLoading ? (
                <View>
                    <Carousel
                        layout="default"
                        layoutCardOffset={9}
                        ref={isCarousel}
                        data={data}
                        renderItem={CarouselCardItem}
                        sliderWidth={SLIDER_WIDTH}
                        itemWidth={ITEM_WIDTH}
                        inactiveSlideShift={0}
                        useScrollView={true}
                        onSnapToItem={(index) => setIndex(index)}
                    />
                    <Pagination
                        dotsLength={data.length}
                        activeDotIndex={index}
                        carouselRef={isCarousel}
                        dotStyle={{
                            width: 10,
                            height: 10,
                            borderRadius: 5,
                            marginHorizontal: 0,
                            backgroundColor: '#ff6905'
                        }}
                        inactiveDotOpacity={0.4}
                        inactiveDotScale={0.6}
                        tappableDots={true}
                    />
                </View>
            ) : (
                <View style={styles.centered}>
                    <ActivityIndicator 
                        style={{marginTop: 200}}
                        size="large" 
                        color="#ffffff"
                    />
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    centered: {
        justifyContent: 'center',
        alignItems: 'center', 
        flex: 1
    },
})

const mapStateToProps = (state, ownProps) => {
    return {
        reports: state.reportList,
        user: state.user.user
    }
}

const mapDispatchToProps = { 
    
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CarouselCards);