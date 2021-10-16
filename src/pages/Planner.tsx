import { useState, createContext, useReducer, useEffect } from "react";
import { useParams } from "react-router-dom";

import Stages from "components/planner/Stages";
import Tabs from "components/planner/Tabs";
import { PageTitle } from "components/ui/Headings";

import plannerInit from "config/planner";
import questsInit from "config/quests";
import attrsInit from "config/attrs";
import gearInit from "config/gear";

import questsReducer from "reducers/quests";
import attrsReducer from "reducers/attrs";
import skillsReducer from "reducers/skills";

//context
export const PlannerContext = createContext({} as IPlannerContext);


// TODO: IMPLEMENT REACT-TRACKED TO THE APP
// TODO: CONSIDER USING THE CONTEXT AS A CUSTOM HOOK
// export const usePlanner = () => useContext(PlannerContext);
// const { ...props } = usePlanner();

export default function Planner() {
  //route params
  const charClass = useParams<{ character: string }>().character;

  //state
  const [planner, setPlanner] = useState(plannerInit);
  const [charData, setCharData] = useState({} as ICharData);

  const [charLevel, setCharLevel] = useState(1);
  const [attrs, dispatchAttrs] = useReducer(attrsReducer, attrsInit);
  const [attrPoints, setAttrPoints] = useState(0);

  const [quests, dispatchQuests] = useReducer(questsReducer, questsInit);

  const [skills, dispatchSkills] = useReducer(skillsReducer, []);
  const [skillPoints, setSkillPoints] = useState(0);

  const [gear, setGear] = useState(gearInit);

  const [isLoading, setIsLoading] = useState(false);

  //props
  const plannerContextProps: IPlannerContext = {
    charClass, charData,

    planner, setPlanner,

    charLevel, setCharLevel,
    attrs, dispatchAttrs,
    attrPoints, setAttrPoints,

    quests, dispatchQuests,

    skills, dispatchSkills,
    skillPoints, setSkillPoints,

    gear, setGear
  }

  //on mount: retrieve character data
  useEffect(() => {
    setIsLoading(true);
    (async function () {
      try {
        //const response = await fetch(`https://d2calc-24ee1-default-rtdb.firebaseio.com/class/${charClass}.json`);
        const response = await fetch(`/data/classes/${charClass}.json`);
        const data = await response.json();
        const { skills, stats }: ICharData = data;

        setCharData(data);

        dispatchAttrs({
          type: 'INIT',
          payload: {
            initialState: {
              strength: {
                ...attrsInit.strength,
                base: stats.strength,
                total: stats.strength
              },
              dexterity: {
                ...attrsInit.dexterity,
                base: stats.dexterity,
                total: stats.dexterity
              },
              vitality: {
                ...attrsInit.vitality,
                base: stats.vitality,
                total: stats.vitality
              },
              energy: {
                ...attrsInit.energy,
                base: stats.energy,
                total: stats.energy
              }
            }
          }
        });

        dispatchSkills({
          type: 'INIT',
          payload: {
            initialState: skills.list
          }
        });

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error(error);
      }
    })();
  }, [charClass]);

  return (
    <>
      <PageTitle>{charLevel > 1 && `Level ${charLevel} `}{charClass}</PageTitle>
      {isLoading ?
        <div>LOADING DATA...</div>
        :
        <PlannerContext.Provider value={plannerContextProps}>
          <Tabs />
          <Stages />
        </PlannerContext.Provider>
      }
    </>
  )
}
