import React, { Component } from "react";
import "./Resultados.css";

export default class Resultados extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resultados: [],
      open: false,
      showItems: false
    };
    this.toggleList = this.toggleList.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
    this.showResultados = this.showResultados.bind(this);
  }

  componentDidMount() {
    this.showResultados();
  }

  toggleShow() {
    if (this.state.showItems === false) {
      this.setState({
        showItems: true
      });
    } else {
      this.setState({
        showItems: false
      });
    }
  }
  toggleList() {
    if (this.state.open === false) {
      this.setState({
        open: true
      });
    } else {
      this.setState({
        open: false
      });
    }
  }

  showResultados() {
    const resultados = this.props.api.getResultados();
    resultados.then(docs => {
      this.setState({
        resultados: Object.values(docs.resultados)
      });
    });
  }

  showList() {
    const list = this.props.api.getList();
    list.then(docs => {
      this.setState({
        list: Object.values(docs.list)
      });
    });
  }

  render() {
    return (
      <div className="results" ref={this.props.resultados}>
        <div className="results-content">
          <div className="results-title">Resultados</div>
          <div className="competitions">
            <div className="competitions-calendar">
              <div className="competitions-next">
                <div className="competitions-next--title">
                  Próximas competições
                </div>
                <ul className="competitions-next--list">
                  <li className="competitions-next--listItems">7ª COPA MG</li>
                </ul>
              </div>
              <div className="competitions-last">
                <div className="competitions-last--title">Anteriores</div>
                <ul className="competitions-last--list">
                  <li
                    className="competitions-last--listItems"
                    onClick={this.toggleShow}
                  >
                    2018
                  </li>
                  {this.state.resultados.map((res, index) => {
                    return (
                      <div
                        key={index}
                        className={`listItems-content ${
                          this.state.showItems ? "show" : "noshow"
                        }`}
                      >
                        <div className="listItems-content--name">
                          {res.name}
                        </div>
                      </div>
                    );
                  })}
                  <li className="competitions-last--listItems">2017</li>
                  <li className="competitions-last--listItems">2016</li>
                </ul>
              </div>
            </div>
            <div className="competitions-results">
              <div className="competitions-results--title">
                Últimas competições
              </div>
              <ul className="competitions-results--list">
                {this.state.resultados.map((res, index) => {
                  return (
                    <div
                      key={index}
                      className="competitions-results--listItems"
                      onClick={this.toggleList}
                    >
                      <div>{res.name} </div>
                      <ul
                        className={`results-items ${
                          this.state.open ? "open" : "closed"
                        }`}
                      >
                        <li>Apuração Geral</li>
                        <li>Dez primeiros</li>
                        <li>Apuração por pombo geral</li>
                      </ul>
                    </div>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
