/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Heatmap from '../Heatmap/Heatmap';
import FilterForm from '../Filter/Filter';
import matches from '../../data/matches.json';

const DashboardContainer = () => {
   const [players, setPlayers] = useState([]);
   const [selectedPlayers, setSelectedPlayers] = useState([]);
   const [match, setMatch] = useState(null);
   const [matchData, setMatchData] = useState([]);
   const [homeTeam, setHomeTeam] = useState(null);
   const [awayTeam, setAwayTeam] = useState(null);

   useEffect(() => {
      if (match) {
         fetch(
            `https://raw.githubusercontent.com/statsbomb/open-data/master/data/events/${match.match_id}.json`,
         )
            .then((response) => response.json())
            .then((matchData) => {
               /* console.log(matchData.filter((event) => event.tactics)); */
               const homeTeam = matchData
                  .filter((event) => event.tactics)
                  .find((event) => event.team.name === match.home_team.home_team_name);
               const awayTeam = matchData
                  .filter((event) => event.tactics)
                  .find((event) => event.team.name === match.away_team.away_team_name);
               setMatchData(matchData);
               setHomeTeam(homeTeam);
               setAwayTeam(awayTeam);
               setPlayers([...homeTeam.tactics.lineup, ...awayTeam.tactics.lineup]);
               /*                console.log(players); */
            })
            .catch((err) => {
               console.error(err);
            });
      }
   }, [match]);

   return (
      <div className="dashboardContainer">
         <h4 className="mb-4 text-4xl text-center p-5 font-extrabold leading-none tracking-tight text-gray-900 ">
            {matches && matches[0] && matches[0].competition
               ? matches[0].competition.competition_name
               : ''}
         </h4>
         <h6 className="mb-4 text-2xl text-center font-semibold leading-none tracking-wider text-gray-600">
            Season:{' '}
            {matches && matches[0] && matches[0].season ? matches[0].season.season_name : ''}
         </h6>

         <FilterForm
            matches={matches}
            setMatch={setMatch}
            players={players}
            setPlayers={setSelectedPlayers}
         />
         {match ? (
            <div>
               <h4 className="mb-4 text-xl text-center font-semibold leading-none tracking-wider text-gray-600">
                  {match.home_team.home_team_name} ({match.home_score}) vs{' '}
                  {match.away_team.away_team_name} ({match.away_score})
               </h4>
               <h5 className="mb-4 text-lg text-center font-semibold leading-none tracking-wider text-gray-600">
                  Date: {match.match_date}
               </h5>
               <div className="container">
                  <div className=" flex items-center">
                     <div className=" grid grid-cols-2 gap-20">
                        {selectedPlayers ? (
                           selectedPlayers.map((player, index) => (
                              <div key={index} className="m-10 ">
                                 <Heatmap
                                    data={matchData}
                                    playerName={player.player.name}
                                    playerPosition={player.position.name}
                                 />
                              </div>
                           ))
                        ) : (
                           <div />
                        )}
                     </div>
                  </div>
               </div>
            </div>
         ) : (
            <div />
         )}
      </div>
   );
};

export default DashboardContainer;

/*  CON COMPONENTE DE CLASE


export default class DashboardContainer extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         players: [],
         selectedPlayers: [],
         match: null,
         matchData: [],
         homeTeam: null,
         awayTeam: null,
      };

      this.setMatch = this.setMatch.bind(this);
      this.setPlayers = this.setPlayers.bind(this);
   }

   setMatch = (match) => {
      this.setState({
         match,
      });
      if (match) {
         fetch(
            `https://raw.githubusercontent.com/statsbomb/open-data/master/data/events/${match.match_id}.json`,
         )
            .then((response) => response.json())
            .then((matchData) => {
               console.log(matchData.filter((event) => event.tactics));
               const homeTeam = matchData
                  .filter((event) => event.tactics)
                  .find((event) => event.team.name === match.home_team.home_team_name);
               const awayTeam = matchData
                  .filter((event) => event.tactics)
                  .find((event) => event.team.name === match.away_team.away_team_name);
               this.setState({
                  matchData,
                  homeTeam,
                  awayTeam,
                  players: [...homeTeam.tactics.lineup, ...awayTeam.tactics.lineup],
               });
            })
            .catch((err) => {
               console.error(err);
            });
      }
   };

   setPlayers = (selectedPlayers) => {
      this.setState({
         selectedPlayers,
      });
   };

   render() {
      return (
         <div className="dashboardContainer">
            <h4 className="title">
               {matches && matches[0] && matches[0].competition
                  ? matches[0].competition.competition_name
                  : ''}
            </h4>
            <h6 className="subTitle">
               Season:{' '}
               {matches && matches[0] && matches[0].season ? matches[0].season.season_name : ''}
            </h6>
            <FilterForm
               matches={matches}
               setMatch={this.setMatch}
               players={this.state.players}
               setPlayers={this.setPlayers}
            />
            {this.state.match ? (
               <div>
                  <h4>
                     {this.state.match.home_team.home_team_name} ({this.state.match.home_score}) vs{' '}
                     {this.state.match.away_team.away_team_name} ({this.state.match.away_score})
                  </h4>
                  <h5>Date: {this.state.match.match_date}</h5>
                  <div className="chartGrid">
                     <div className="bx--grid">
                        <div className="bx--row">
                           {this.state.selectedPlayers ? (
                              this.state.selectedPlayers.map((player, index) => (
                                 <div key={index} className="bx--col">
                                    <Heatmap
                                       data={this.state.matchData}
                                       playerName={player.player.name}
                                       playerPosition={player.position.name}
                                    />
                                 </div>
                              ))
                           ) : (
                              <div />
                           )}
                        </div>
                     </div>
                  </div>
               </div>
            ) : (
               <div />
            )}
         </div>
      );
   }
}
 */
