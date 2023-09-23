// Ved bruk av ChessBoard.js, så har vi laget en ferdig layout med Sjakkbrett + Trekkhistorie
// Koden er hentet fra https://github.com/willb335/chessboardjsx
// Koden har deretter blitt modifisert av Philip og Endre, både for Front-end og Back-end
// Koden vi har modifisert eller laget selv er kommentert
// Dette ligger klart til bruk, ved å kalle denne filen <ChessBoard/> på en annen fil mellom <navbar> og <footer>

import React, { Component, useState, useEffect} from "react";
import PropTypes from "prop-types";
import { Chess } from "chess.js";
import Chessboard from "chessboardjsx";
import { listeMedTrekk } from "./moves";

const squareStyling = ({ pieceSquare, history }) => {
  if (!history || history.length === 0) {
    return {};
  }

  const sourceSquare = history[history.length - 1].from;
  const targetSquare = history[history.length - 1].to;

  return {
    [pieceSquare]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
    ...(sourceSquare && {
      [sourceSquare]: {
        backgroundColor: "rgba(255, 255, 0, 0.4)"
      }
    }),
    ...(targetSquare && {
      [targetSquare]: {
        backgroundColor: "rgba(255, 255, 0, 0.4)"
      }
    })
  };
};

class HumanVsHuman extends Component {
  
  static propTypes = { children: PropTypes.func };

  // Philip la til "history"
  state = {
    fen: "start",
    dropSquareStyle: {},
    squareStyles: {},
    pieceSquare: "",
    square: "",
    history: []
  };

  componentDidMount() {
    this.game = new Chess();
  }
  validateMove = moveConfig => {
    const { from, to } = moveConfig;
    const moves = this.game.moves({ verbose: true });
  
    // Check if the move is in the list of valid moves
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].from === from && moves[i].to === to) {
        return true;
      }
    }
  
    return false;
  };

  removeHighlightSquare = () => {
    this.setState(({ pieceSquare, history }) => ({
      squareStyles: squareStyling({ pieceSquare, history })
    }));
  };

  highlightSquare = (sourceSquare, squaresToHighlight) => {
    const highlightStyles = squaresToHighlight.reduce((a, c) => {
      return {
        ...a,
        [c]: {
          background:
            "radial-gradient(circle, #fffc00 36%, transparent 40%)",
          borderRadius: "50%"
        }
      };
    }, {});
  
    this.setState(prevState => ({
      squareStyles: {
        ...prevState.squareStyles,
        ...highlightStyles,
        ...squareStyling({
          pieceSquare: prevState.pieceSquare,
          history: prevState.history
        })
      }
    }));
  };


  onDrop = ({ sourceSquare, targetSquare }) => {
    const moveConfig = {
      from: sourceSquare,
      to: targetSquare,
      promotion: "q" // always promote to a queen for simplicity
    };
  
    const isValidMove = this.validateMove(moveConfig);
  
    if (!isValidMove) {
      // Invalid move, do nothing
      return;
    }
  
    // ---------------------------------------------------------
    // modifisert av Endre, med forslag og innspill fra chatGPT-3
    const move = this.game.move(moveConfig);
    const updatedHistory = this.game.history({ verbose: true });
  
    this.setState(prevState => ({
      fen: this.game.fen(),
      history: updatedHistory,
      pieceSquare: targetSquare,
      squareStyles: squareStyling({ pieceSquare: targetSquare, history: updatedHistory }),
      dropSquareStyle: {}
    }));
  
    listeMedTrekk.push(this.game.fen()); // Lagrer fen-strings i liste
  };
  // ---------------------------------------------------------
  onMouseOverSquare = square => {
    const { pieceSquare } = this.state;
  
    // Check if a piece is selected and get its possible moves
    if (pieceSquare) {
      const moves = this.game.moves({
        square: pieceSquare,
        verbose: true
      });
  
      // Check if the hovered square is a valid move target
      const squaresToHighlight = moves
        .filter(move => move.from === pieceSquare && move.to === square)
        .map(move => move.to);
  
      this.setState(prevState => ({
        squareStyles: {
          ...prevState.squareStyles,
          ...squareStyling({ pieceSquare, squaresToHighlight })
        }
      }));
    }
  };
  
  onMouseOutSquare = () => {
    this.setState(prevState => ({
      squareStyles: squareStyling({ pieceSquare: prevState.pieceSquare, history: prevState.history })
    }));
  };
  
  
  onDragOverSquare = square => {
    this.setState({
      dropSquareStyle:
        square === "e4" || square === "d4" || square === "e5" || square === "d5"
          ? { backgroundColor: "cornFlowerBlue" }
          : { boxShadow: "inset 0 0 1px 4px rgb(255, 255, 0)" }
    });
  };
  
  onSquareRightClick = square =>
    this.setState({
      squareStyles: { [square]: { backgroundColor: "deepPink" } }
    });

  render() {
    const { fen, dropSquareStyle, squareStyles, history } = this.state;

    return this.props.children({
      squareStyles,
      position: fen,
      onMouseOverSquare: this.onMouseOverSquare,
      onMouseOutSquare: this.onMouseOutSquare,
      onDrop: this.onDrop,
      dropSquareStyle,
      onDragOverSquare: this.onDragOverSquare,
      onSquareRightClick: this.onSquareRightClick,
      history: history
    });
  }
}

// Har også fjernet en god del fra den originale koden, man kan for eksempel ikke klikke for å gjøre trekk,
// kun drag-and-drop. Dette måtte gjøres for å fikse noe funksjonalitet i ØveÅpnig og LagÅpning


export default function ChessBoard() {
  return (
    // Mye styling gjort av Philip ved bruk av TailwindCSS
    <div className="mt-10 md:flex md:justify-center">
      <div className="">
        <div className="">
          <HumanVsHuman>
            {({
              position,
              onDrop,
              onMouseOverSquare,
              onMouseOutSquare,
              squareStyles,
              dropSquareStyle,
              onDragOverSquare,
              onSquareRightClick,
              history
            }) => (
            // Brettet har en fixed størrelse, måtte til for å gjøre brettet mer mobilvennlig. Kunne har løst på en bedre måte men rakk ikke.
              <div className="sm:grid sm:grid-cols-1 md:flex md:justify-center mb-12 m-8">
                  <Chessboard
                    id="humanVsHuman"
                    width={425}
                    position={position}
                    onDrop={onDrop}
                    onMouseOverSquare={onMouseOverSquare}
                    onMouseOutSquare={onMouseOutSquare}
                    boardStyle={{
                      borderRadius: "5px",
                      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)"
                    }}
                    squareStyles={squareStyles}
                    dropSquareStyle={dropSquareStyle}
                    onDragOverSquare={onDragOverSquare}
                    onSquareRightClick={onSquareRightClick}
                  />
                // Philip la til "history" som viser alle trekk gjort i sjakkpartiet.
               <div className="grid place-content-center m-2">
                <div className="border-2 bg-slate-500 overflow-y-auto h-60 w-40 place-content-center">
                  <div className="text-m font-bold text-center m">
                    Historikk
                  </div>
                  <ul className="h-full">
                    {history.map((move, index) => (
                      <li
                        className={`text-center text-m font-bold list-none ${
                          move.color === "w" ? "text-white" : "text-black"
                        }`}
                        key={index}
                      >
                        {move.san}
                      </li>
                    ))}
                  </ul>
                </div>
                </div> 
              </div>
            )}
          </HumanVsHuman>
        </div>
      </div>
    </div>
    
  );
}