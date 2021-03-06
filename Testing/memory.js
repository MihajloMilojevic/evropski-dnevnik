import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Alert,
} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";

import CardFlip from 'react-native-card-flip';

class Memory extends React.Component {

  constructor(props) {
    super(props); 
    this.EU = "https://iliad-solutions.com/wp-content/uploads/2017/08/EU.jpg";
    this.table = this.copyTable(this.props.table)
    this.state = {
      table: this.copyTable(this.props.table),
      open: []
    }

    this.copyTable = this.copyTable.bind(this);
    this.alreadyOpened = this.alreadyOpened.bind(this);
    this.win = this.win.bind(this);
    
    this.styles =  StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
      },
      cardContainer: {
        width: "100%",
        height: "100%",
     },
      card: {
        width: "100%",
        aspectRatio: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#FE474C',
        borderRadius: 5,
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.5,
      },
      card1: {
        backgroundColor: '#FE474C',
      },
      card2: {
        backgroundColor: '#FEB12C',
      },
      label: {
        textAlign: 'center',
        fontSize: 55,
        fontFamily: 'System',
        color: '#ffffff',
        backgroundColor: 'lime',
      },
      image: {
        width: "100%",
        height: "100%",
        resizeMode: "contain"
      }
    });
  }

  alreadyOpened(row, col) {
    const cards = this.state.open;
    for(let card of cards)
      if(card.row === row && card.col === col)
        return true;
    return false;
  }

  win() {
    for(let i = 0; i < this.state.table.length; i++)
      for(let j = 0; j < this.state.table[i].length; j++)
        if(this.state.table[i][j] !== null)
          return false;
    return true;
  }

  copyTable(table) {
    let newTable = [];
    for(let i = 0; i < table.length; i++)
    {
      let newRow = [];
      for(let j = 0; j < table[i].length; j++)
        newRow.push(table[i][j]);
      newTable.push(newRow);
    }
    return newTable;
  }

  render() {

    const onClick = (row, col) => () => {
      if(this.state.table[row][col] === null) {
        this["card-" + row + "-" + col].jiggle();
        return;
      }
      this["card-" + row + "-" + col].flip();
      if(this.alreadyOpened(row, col))
      {
        this.setState({
          open: this.state.open.filter(card => (card.row !== row && card.col !== col))
        })
        return;
      }
      this.setState({
        open: [...this.state.open, { row, col }]
      },
      function() {
        // console.log(this.state.open)
        if(this.state.open.length < 2) return;
        const first = this.state.open[0]
        const second = this.state.open[1]
        // console.log(this.state.table[first.row][first.col]);
        // console.log(this.state.table[second.row][second.col]);
        if(this.state.table[first.row][first.col] === this.state.table[second.row][second.col])
        {
          // console.log("match")
          const newTable = this.copyTable(this.state.table);
          newTable[first.row][first.col] = null;
          newTable[second.row][second.col] = null;
          this.setState({
            table: newTable,
            open: []
          },
          () => {
            if(this.win()) {
              Alert.alert("Pobeda", "Pobedio si");
            }
          })
          return;
        }
        this.setState({
          open: []
        })
        setTimeout(() => {
          this["card-" + first.row + "-" + first.col].flip();
          this["card-" + second.row + "-" + second.col].flip();
        }, 1000)
        }
      )
    }

    return (
        <Grid style={this.styles.container}>
          {
            this.table.map((row, rowIndex) => (
              <Row key={"row-" + rowIndex}>
                {
                  row.map((col, colIndex) => (
                    <Col 
                      key={"col-" + rowIndex + "-" + colIndex}
                      style={{
                        //backgroundColor: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`,
                        margin: 20
                      }}
                    >
                      <CardFlip style={this.styles.cardContainer} ref={card => (this["card-" + rowIndex + "-" + colIndex] = card)}>
                        <TouchableOpacity
                          activeOpacity={1}
                          style={[this.styles.card, this.styles.card1]}
                          onPress={onClick(rowIndex, colIndex)}>
                          <ImageBackground
                            source={{uri: this.EU}}
                            style={this.styles.image}
                            resizeMode={"cover"}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          activeOpacity={1}
                          style={[this.styles.card, this.styles.card2]}
                          onPress={onClick(rowIndex, colIndex)}>
                          <ImageBackground
                            source={{uri: this.props.urls[col]}}
                            style={this.styles.image}
                            resizeMode={"cover"}
                          />
                        </TouchableOpacity>
                      </CardFlip>
                    </Col>
                  ))
                }
              </Row>
            ))
          }
        </Grid>
    );
  }
};


export default Memory;
