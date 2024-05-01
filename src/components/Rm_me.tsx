const Walletcode = () => {
  return (
    <div className="grid-event _with-video _no-video _live" role="presentation">
      <div className="grid-event__title _football _tournament-title">
        <div className="grid-event__time _live">
          <span>Break 1 '45</span>
        </div>
      </div>
      <div className="grid-event__content">
        <a
          className="grid-event__competitors"
          href="/football/aston-villa-vs-chelsea-19858886/bets"
        >
          <div className="grid-event__competitors-wrapper">
            <div className="grid-event__competitor">
              <div className="grid-event__competitor-wrap">
                <div className="grid-event__competitor-name">
                  <span>Aston Villa</span>
                </div>
              </div>
            </div>
            <div className="grid-event__competitors-divider">VS</div>
            <div className="grid-event__competitor">
              <div className="grid-event__competitor-wrap">
                <div className="grid-event__competitor-name">
                  <span>Chelsea</span>
                </div>
              </div>
            </div>
          </div>
          <div className="grid-event__score">
            <div className="score__col">
              <span className="score__item _active">2</span>
              <span className="score__item">0</span>
            </div>
          </div>
        </a>
        <div className="grid-markets">
          <div className="grid-market _multi">
            <button className="outcome equal _101" type="button">
              <span className="outcome__status">1</span>
              <span className="outcome__number">1.13</span>
            </button>
            <button className="outcome equal _102" type="button">
              <span className="outcome__status">X</span>
              <span className="outcome__number">8.50</span>
            </button>
            <button className="outcome equal _103" type="button">
              <span className="outcome__status">2</span>
              <span className="outcome__number">23.00</span>
            </button>
            <div className="grid-market__name">Match Winner</div>
          </div>
          <div className="grid-market _double">
            <button className="outcome equal _104" type="button">
              <span className="outcome__status">O 3.5</span>
              <span className="outcome__number _small-fs">1.65</span>
            </button>
            <button className="outcome equal _105" type="button">
              <span className="outcome__status">U 3.5</span>
              <span className="outcome__number _small-fs">2.12</span>
            </button>
            <div className="grid-market__name">Total</div>
          </div>
        </div>
        <a href="/football/aston-villa-vs-chelsea-19858886/bets">
          <div className="grid-event__match-tracker video-btn">
            <i className="iconFont iconFont-match-tracker-tab-icon"></i>
          </div>
        </a>
      </div>
    </div>
  );
};
export default Walletcode;
