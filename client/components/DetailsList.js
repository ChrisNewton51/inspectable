import React, { useState } from 'react'
import { 
    View, 
    Text, 
    TouchableOpacity, 
    FlatList,
    Platform,
    KeyboardAvoidingView
} from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import { fillData } from '../redux/actions/templateAction';

const DetailsList = (props) => {

    const [selectSection, setSelectSection] = useState(null);           // Selected Details Section
    
    // Details variables
    var detail;
    const details = useSelector(state => state.template.details);
    const dispatch = useDispatch(); 
    
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <FlatList
                contentContainerStyle={{
                    paddingBottom: '170%',
                }}
                style={{
                    marginTop: 0,
                    paddingHorizontal: 6,
                    width: '100%',
                    height: '100%'
                }}
                data={details}
                keyExtractor={(item) => item.id} 
                renderItem={({item, index}) => {  
                    var selected;
                    if (item.id === selectSection) {
                        selected = true;
                    } else {
                        selected = false;
                    }

                    return (
                        <View>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: '#282C3A',
                                    paddingVertical: Platform.OS === 'ios' ? 15: 10,
                                    paddingHorizontal: 20,
                                    shadowOffset: {
                                        width: 0,
                                        height: 3
                                    },
                                    shadowColor: '#000',
                                    elevation: 5,
                                    shadowRadius: 8,
                                    shadowOpacity: .2,
                                    borderRadius: 7,
                                    marginTop: 15,
                                    justifyContent: 'center',
                                }}
                                onPress={() => {
                                    setSelectSection(item.id)
                                    dispatch(fillData(props.currentIndex, item.title, item.id))
                                }}
                            >
                                <Text 
                                    style={{
                                        color: 'white', 
                                        fontSize: 16,
                                        width: '70%',
                                    }}
                                >{item.title}</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }}
            />                        
            <View style={{ flex: 1 }} /> 
        </KeyboardAvoidingView>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        report: state.report,
        details: state.template.details
    }
}

const mapDispatchToProps = { 
    fillData
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DetailsList);