/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable react/jsx-no-bind */
import React, { Component } from "react";
import CardRepeater from "./components/CardRepeater";
import ArrRandomiser from "./utils/arrrandomiser";
import Clow from "./utils/cardselector";
import delayer from "./utils/delayer";
import { setSomeCardsToThis } from './utils/cardshuffler' //eslint-disable-line
import { LostModal, PrizeModal, WinAllModal } from "./components/modals";
import GiftBox from "./components/GitftBox";
import { initPrizeState } from "./constants";

class App extends Component {
  public state: any;
  public setState: any;

  constructor(props: any) {
    super(props);
    this.state = Object.assign(
      {},
      {
        cards: ArrRandomiser([...Clow]),
        flippedId: null,
        lostGame: false,
        lastWonPrize: null,
        winAll: false,
        nearlyFlippedCard: null,
      },
      initPrizeState
    );
  }

  loseGame() {
    this.setState({
      lostGame: true,
    });
  }

  resetGame() {
    this.resetPrizes();
    this.resetCards();
  }

  resetPrizes() {
    this.setState(
      Object.assign(
        {},
        {
          flippedId: null,
          lostGame: false,
          lastWonPrize: null,
          winAll: false,
        },
        initPrizeState
      )
    );
  }

  resetCards() {
    delayer(() =>
      this.setState({
        cards: ArrRandomiser([...Clow]),
        flippedId: null,
        nearlyFlippedCard: null,
      })
    );
  }

  winAll() {
    this.setState({
      winAll: true,
    });
  }

  dispatchPrize() {
    if (this.state.prizeTickets) {
      this.setState({
        prizeTickets: this.state.prizeTickets - 1,
        userTickets: this.state.userTickets + 1,
        lastWonPrize: "Movie Ticket",
      });
      return;
    }
    if (this.state.prizeMobiles) {
      this.setState({
        prizeMobiles: this.state.prizeMobiles - 1,
        userMobiles: this.state.userMobiles + 1,
        lastWonPrize: "Mobile",
      });
      return;
    }
    if (this.state.prizeBikes) {
      this.setState({
        prizeBikes: this.state.prizeBikes - 1,
        userBikes: this.state.userBikes + 1,
        lastWonPrize: "Bike",
      });
      return;
    }
    this.winAll();
  }

  getFlippedCards() {
    return this.state.cards.filter((x: { flipped: any }) => x.flipped).length;
  }

  rotateCard(
    card: { currentTarget: { classList: { toggle: (arg0: string) => void } } },
    index: number
  ) {
    if (this.state.nearlyFlippedCard === index) return;
    const fake = this;
    if (fake.getFlippedCards() > 1) {
      fake.resetCards();
      return;
    }

    card.currentTarget.classList.toggle("flip");
    delayer(() =>
      fake.setState({
        cards: fake.state.cards.map((x: any, i: string | number) =>
          index === i ? Object.assign({}, x, { flipped: true }) : x
        ),
      })
    );

    if (this.state.flippedId) {
      this.state.cards[index].id === this.state.flippedId
        ? this.dispatchPrize()
        : this.loseGame();
      return;
    }

    // card Setting here
    this.setState({
      nearlyFlippedCard: index,
      flippedId: this.state.cards[index].id,
      cards: setSomeCardsToThis(index)(this.state.cards),
    });
  }

  loseLostModal() {
    this.resetGame();
  }

  closePrizeModal() {
    this.setState({
      lastWonPrize: null,
    });
    this.resetCards();
  }

  render() {
    return (
      <div className="app">
        <LostModal
          isShown={this.state.lostGame}
          closeModal={() => this.loseLostModal()}
        />
        <WinAllModal
          isShown={this.state.winAll}
          closeModal={() => this.resetGame()}
        />
        <PrizeModal
          isShown={!!this.state.lastWonPrize}
          closeModal={() => this.closePrizeModal()}
          prize={this.state.lastWonPrize}
        />
        <GiftBox
          title="Prizes to be won"
          bikes={this.state.prizeBikes}
          mobiles={this.state.prizeMobiles}
          movieTickets={this.state.prizeTickets}
          titleClass="prizes-tobe-won"
          emptyText={"We Ran out of Prizes"}
        />
        <CardRepeater
          rotate={(
            card: {
              currentTarget: {
                classList: {
                  toggle: (
                    arg0: string
                    /* eslint-disable react/jsx-no-bind */
                  ) => void;
                };
              };
            },
            index: number
          ) => this.rotateCard(card, index)}
          clows={this.state.cards}
        />
        <GiftBox
          title="You Won"
          bikes={this.state.userBikes}
          mobiles={this.state.userMobiles}
          movieTickets={this.state.userTickets}
          titleClass="prizes-you-won"
          emptyText={"Start Flipping Cards, if it matches you'll get a prize"}
        />
      </div>
    );
  }
}

export default App;
