/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, Fragment, useEffect } from 'react';
import { Combobox, Transition, Listbox } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

const FilterForm = (props) => {
   const [match, setMatch] = useState(null);
   const [players, setPlayers] = useState([]);
   const [selectedMatch, setSelectedMatch] = useState('');
   const [selectedPlayers, setSelectedPlayers] = useState([]);
   const [query, setQuery] = useState('');

   useEffect(() => {
      setSelectedPlayers([]);
   }, [selectedMatch]);

   const handleMatchChange = (newMatch) => {
      setSelectedMatch(
         `${newMatch.home_team.home_team_name} (${newMatch.home_score}) vs ${newMatch.away_team.away_team_name} (${newMatch.away_score})`,
      );
      setMatch(newMatch);
      props.setMatch(newMatch);
   };

   const handlePlayersChange = (newPlayers) => {
      setSelectedPlayers(newPlayers);
      setPlayers(newPlayers);
      props.setPlayers(newPlayers);
      console.log(players, 'hola');
   };

   const filteredMatch =
      query === ''
         ? props.matches
         : props.matches.filter((match) => {
              return match.name.toLowerCase().includes(query.toLowerCase());
           });

   return (
      <div className="w-full flex flex-row items-center justify-center gap-3 p-12 ">
         {/*          {console.log(props.players)} */}

         <Combobox onChange={handleMatchChange} className="">
            <div className="relative w-4/12 mt-1">
               <p className="mb-2 text-md text-left font-semibold  tracking-wider text-gray-600">
                  Select a match
               </p>
               <div className="relative  w-full cursor-pointer overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm ">
                  <Combobox.Input
                     className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 tracking-wide font-semibold text-gray-900 focus:ring-0"
                     onChange={(event) => setQuery(event.target.value)}
                     placeholder={selectedMatch}
                  />
                  <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                     <ChevronUpDownIcon className="h-8 w-8 text-gray-400" aria-hidden="true" />
                  </Combobox.Button>
               </div>
               <Transition
                  as={Fragment}
                  leave="transition ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  afterLeave={() => setQuery('')}
               >
                  <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
                     {filteredMatch.length === 0 && query !== '' ? (
                        <div className="relative cursor-default select-none py-2 px-4 text-gray-700 font-bold">
                           Nothing found.
                        </div>
                     ) : (
                        filteredMatch.map((match) => (
                           <Combobox.Option
                              key={match.id}
                              className={({ active }) =>
                                 `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active ? 'bg-teal-600 text-white' : 'text-gray-900'
                                 }`
                              }
                              value={match}
                           >
                              {({ selected, active }) => (
                                 <>
                                    <span
                                       className={`block truncate ${
                                          selected ? 'font-medium' : 'font-normal'
                                       }`}
                                    >
                                       {`${match.home_team.home_team_name} (${match.home_score}) vs ${match.away_team.away_team_name} (${match.away_score})`}
                                    </span>
                                    {selected ? (
                                       <span
                                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                             active ? 'text-white' : 'text-teal-600'
                                          }`}
                                       >
                                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                       </span>
                                    ) : null}
                                 </>
                              )}
                           </Combobox.Option>
                        ))
                     )}
                  </Combobox.Options>
               </Transition>
            </div>
         </Combobox>

         <div className={`w-3/12 z-50  ${!selectedMatch && ' invisible'}`}>
            <Listbox value={selectedPlayers} onChange={handlePlayersChange} multiple>
               <p className="mb-2 text-md text-left font-semibold  tracking-wider text-gray-600">
                  Select a match
               </p>
               <div className="relative mt-1">
                  <Listbox.Button
                     className={`relative w-full cursor-default rounded-lg bg-white py-4 pl-3 pr-4 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm ${
                        !selectedMatch ? 'cursor-not-allowed' : 'cursor-pointer'
                     }`}
                  >
                     <span className=" flex flex-row flex-wrap font-semibold">
                        {selectedPlayers.map((player, index) => (
                           <span key={index} className="p-1 m-2 text-black rounded-lg bg-gray-200">
                              {player.player.name}
                           </span>
                        ))}
                     </span>

                     <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon className="h-8 w-8 text-gray-400" aria-hidden="true" />
                     </span>
                  </Listbox.Button>
                  <Transition
                     as={Fragment}
                     leave="transition ease-in duration-100"
                     leaveFrom="opacity-100"
                     leaveTo="opacity-0"
                     afterLeave={() => setQuery('')}
                  >
                     <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {props.players.map((player) => (
                           <Listbox.Option
                              key={player.player.id}
                              className={({ active }) =>
                                 `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                 }`
                              }
                              value={player}
                           >
                              {({ selected }) => (
                                 <>
                                    <span
                                       className={`block truncate ${
                                          selected ? 'font-medium' : 'font-normal'
                                       }`}
                                    >
                                       {player.player.name}
                                    </span>
                                    {selected ? (
                                       <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                       </span>
                                    ) : null}
                                 </>
                              )}
                           </Listbox.Option>
                        ))}
                     </Listbox.Options>
                  </Transition>
               </div>
            </Listbox>
         </div>
      </div>
   );
};

export default FilterForm;
