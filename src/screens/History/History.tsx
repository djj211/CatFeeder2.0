import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import {
  Spinner,
  List,
  ListItem,
  Divider,
  withStyles,
} from "@ui-kitten/components";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "moment";

import * as CommonSelectors from "../../state/selectors";
import * as CommonActions from "../../state/actions";

import { feedData } from "../../interfaces/interfaces";
import * as Constants from "../../constants/Constants";

const History = () => {
  const dispatch = useDispatch();
  const retFeedData = useSelector(CommonSelectors.getHistory);
  const isLoaded = useSelector(CommonSelectors.getLoaded);
  const hasError = useSelector(CommonSelectors.getHasError);
  const errorText = useSelector(CommonSelectors.getErrorText);

  useEffect(() => {
    dispatch(CommonActions.getHistory());
  }, [dispatch]);

  const renderItem = ({ item }: { item: feedData; index: number }) => (
    <ListItem style={styles.listItem}>
      <View style={styles.catContainer}>
        <Icon style={styles.cat} name="cat" />
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.feedDate}>
          {moment(item.feedDate).format(Constants.DATE_FORMAT)} for{" "}
          {item.feedTime} seconds
        </Text>
      </View>
    </ListItem>
  );

  const customDivider = () => {
    return <Divider style={styles.divider} />;
  };

  return (
    <React.Fragment>
      {!isLoaded && (
        <View style={styles.spinner}>
          <Spinner size="giant" status="success" />
        </View>
      )}
      {!hasError && isLoaded && (
        <View style={styles.container}>
          <List
            data={retFeedData}
            renderItem={renderItem}
            ItemSeparatorComponent={customDivider}
          ></List>
        </View>
      )}
      {hasError && isLoaded && (
        <View style={styles.errorContainer}>
          <Text key="error" style={styles.white}>
            {errorText}
          </Text>
        </View>
      )}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#598BFF",
    alignSelf: "stretch",
    alignContent: "center",
  },
  errorContainer: {
    flex: 1,
    backgroundColor: "#598BFF",
    alignItems: "center",
    justifyContent: "center",
  },
  listItem: {
    backgroundColor: "#598BFF",
  },
  feedDate: {
    fontSize: 20,
    color: "white",
    alignSelf: "center",
  },
  dateContainer: {
    flex: 1,
    justifyContent: "center",
  },
  spinner: {
    backgroundColor: "#598BFF",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    backgroundColor: "white",
  },
  cat: {
    fontSize: 20,
    color: "white",
  },
  catContainer: {
    marginLeft: -5,
  },
  white: {
    marginBottom: 5,
    color: "white",
    fontSize: 20,
  },
});

export default History;
