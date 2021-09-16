import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { Button, ActionSheet, Root } from "native-base";
import { StyleSheet, Alert, View, Text } from "react-native";
import { Spinner, Modal, Card } from "@ui-kitten/components";
import Icon from "react-native-vector-icons/FontAwesome5";

import * as CommonActions from "../../state/actions";
import * as CommonSelectors from "../../state/selectors";
import * as Constants from "../../constants/Constants";
import { FeedApi } from "../../interfaces/interfaces";

const Feed = () => {
  const dispatch = useDispatch();
  const lastFeed = useSelector(CommonSelectors.getLastFeed);
  const isLoaded = useSelector(CommonSelectors.getFeedLoaded);
  const hasError = useSelector(CommonSelectors.getHasFeedError);
  const errorText = useSelector(CommonSelectors.getFeedErrorText);
  const overFour = useSelector(CommonSelectors.overFourHours);
  const [visible, setVisible] = useState(false);
  const [feedTime, setFeedTime] = useState("");
  const [feeding, setFeeding] = useState(false);
  const CANCEL_INDEX = 3;
  const buttons = ["Half", "Regular", "Double", "Cancel"];
  const buttonMapping = ["2", "4", "8"];

  useEffect(() => {
    dispatch(CommonActions.getLastFeed());
  }, [dispatch]);

  const toggleModal = () => {
    setVisible(!visible);
  };

  const doFeed = async (feedSeconds: string) => {
    const requests: any[] = [];
    const theFeed: FeedApi = {
      time: feedSeconds,
    };

    if (visible) {
      toggleModal();
    }

    setFeeding(true);
    requests.push(dispatch(CommonActions.doFeed(theFeed)));
    await Promise.all(requests);
    setFeeding(false);

    if (!hasError) {
      batch(() => {
        dispatch(CommonActions.getLastFeed());
        dispatch(CommonActions.getHistory());
      });
    }
  };

  const feed = (buttonIndex: number) => {
    if (buttonIndex < 3) {
      if (!overFour) {
        setFeedTime(buttonMapping[buttonIndex]);
        toggleModal();
      } else {
        doFeed(buttonMapping[buttonIndex]);
      }
    }
  };

  return (
    <Root>
      {!isLoaded && (
        <View style={styles.container}>
          <Spinner size="giant" status="success" />
        </View>
      )}
      {!hasError && isLoaded && (
        <View style={styles.container}>
          <Icon name="cat" style={[styles.white, styles.cat]} />
          <Button
            style={styles.button}
            primary
            onPress={() =>
              ActionSheet.show(
                {
                  options: buttons,
                  cancelButtonIndex: CANCEL_INDEX,
                  title: "Feed Time",
                },
                (buttonIndex) => {
                  feed(buttonIndex);
                }
              )
            }
          >
            <Text style={styles.white}>Feed</Text>
          </Button>
          <Text style={[styles.white, styles.lastFeed]}>
            Last Feed: {lastFeed.format(Constants.DATE_FORMAT)}
          </Text>
        </View>
      )}
      {hasError && isLoaded && (
        <View style={styles.container}>
          <Text style={styles.white}>{errorText}</Text>
        </View>
      )}
      <Modal visible={visible}>
        <Card style={styles.modal} disabled={true}>
          <Text>Last feed was less than 4 hours. Are you sure?</Text>
          <View style={styles.options}>
            <Button style={styles.confirm} onPress={() => doFeed(feedTime)}>
              <Text>Yes</Text>
            </Button>
            <Button style={styles.decline} onPress={toggleModal}>
              <Text>No</Text>
            </Button>
          </View>
        </Card>
      </Modal>
      <Modal visible={feeding}>
        <Card style={styles.modal} disabled={true}>
          <Text>Feeding</Text>
          <View style={styles.feedSpinner}>
            <Spinner size="giant" status="success" />
          </View>
        </Card>
      </Modal>
    </Root>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#598BFF",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 150,
    justifyContent: "center",
    alignSelf: "center"
  },
  white: {
    marginBottom: 5,
    color: "white",
    fontSize: 20,
  },
  lastFeed: {
    paddingTop: 10,
  },
  cat: {
    fontSize: 50,
    paddingBottom: 5,
  },
  modal: {
    backgroundColor: "white",
  },
  confirm: {
    backgroundColor: "green",
    marginRight: 5,
    flex: 1,
    paddingTop: 13,
    justifyContent: "center",
  },
  decline: {
    backgroundColor: "red",
    marginLeft: 5,
    flex: 1,
    paddingTop: 13,
    justifyContent: "center",
  },
  options: {
    flexWrap: "wrap",
    alignItems: "flex-start",
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    paddingTop: 20,
  },
  feedSpinner: {
    flexWrap: "wrap",
    alignItems: "flex-start",
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
  },
});

export default Feed;
