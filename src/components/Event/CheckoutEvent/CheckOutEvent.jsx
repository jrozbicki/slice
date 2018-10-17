import React, { Component } from "react";
import _ from "lodash";
class CheckOutEvent extends Component {
  // algorithm that is responsible to calculate needed transactions between users
  checkOutEventCalculator = () => {
    const { subscribersData, eventData } = this.props;
    const eventId = eventData.id;

    const eventTotal = eventData.eventTotal;
    console.log(eventTotal);
    const userCount = eventData.users.length;
    const eventAverage =
      Math.floor(parseFloat(eventTotal / userCount) * 100) / 100;

    const summary = subscribersData.map(subscriber => {
      const { userTotal } = subscriber.events[eventId];
      const delta = userTotal - eventAverage;
      return {
        id: subscriber.id,
        name: subscriber.name,
        userTotal: parseFloat(userTotal).toFixed(2),
        delta: Math.floor(delta * 100) / 100,
        pending: Math.abs(Math.floor(delta * 100) / 100)
      };
    });

    console.log("summary", summary);
    console.log("sorted", _.sortBy(summary, ["delta"]));
    console.log("event average", eventAverage);
    const onMinus = [];
    const onPlus = [];
    summary.map(subscriber => {
      if (subscriber.delta < 0) {
        onMinus.push(subscriber);
      } else if (subscriber.delta > 0) {
        onPlus.push(subscriber);
      }
    });

    const transactions = [];
    const subscribersAfter = [];

    let minusBuffer = onMinus.shift();
    let plusBuffer = onPlus.shift();
    while (minusBuffer && plusBuffer) {
      let transactionValue = 0;
      if (minusBuffer.pending > plusBuffer.pending) {
        transactionValue = plusBuffer.pending;
        plusBuffer.pending -= transactionValue;
        minusBuffer.pending -= transactionValue;
        transactions.push({
          from: minusBuffer.name,
          to: plusBuffer.name,
          transactionValue: Math.ceil(transactionValue * 100) / 100,
          id: transactions.length + 1
        });
        subscribersAfter.push(plusBuffer);
        if (minusBuffer.pending < 0.01) {
          //minusBuffer.pending = 0;
          subscribersAfter.push(minusBuffer);
        }
        plusBuffer = null;
        plusBuffer = onPlus.shift();
      } else {
        transactionValue = minusBuffer.pending;
        minusBuffer.pending -= transactionValue;
        plusBuffer.pending -= transactionValue;
        transactions.push({
          from: minusBuffer.name,
          to: plusBuffer.name,
          transactionValue: Math.ceil(transactionValue * 100) / 100,
          id: transactions.length + 1
        });
        subscribersAfter.push(minusBuffer);
        if (plusBuffer.pending < 0.01) {
          //plusBuffer.pending = 0;
          subscribersAfter.push(plusBuffer);
        }
        minusBuffer = null;
        minusBuffer = onMinus.shift();
      }
    }
    console.log("transactions", transactions);
    console.log("after", subscribersAfter);

    return <div>CheckOutEvent</div>;
  };

  render() {
    return <div>{this.checkOutEventCalculator()}</div>;
  }
}

export default CheckOutEvent;
