import { useState, createContext, useReducer, useEffect } from "react";
import { useParams } from "react-router-dom";

import Stages from "components/planner/Stages";
import Tabs from "components/planner/Tabs";
import { PageTitle } from "components/ui/Headings";

import plannerInit from "config/planner";
import attrsInit from "config/attrs";
import questsInit from "config/quests";
// import gearInit from "config/gear";
// import itemsInit from "config/items";

import attrsReducer from "reducers/attrs";
import questsReducer from "reducers/quests";
import skillsReducer from "reducers/skills";
//import gearReducer from "reducers/gear";
//import itemsReducer from "reducers/items";

//context
export const PlannerContext = createContext({} as PlannerContext);


// TODO: IMPLEMENT REACT-TRACKED TO THE APP
// TODO: CONSIDER USING THE CONTEXT AS A CUSTOM HOOK
// export const usePlanner = () => useContext(PlannerContext);
// const { ...props } = usePlanner();

export default function Planner() {
  //route params
  const charClass = useParams<{ character: string }>().character;

  //state
  const [planner, setPlanner] = useState(plannerInit);
  const [charData, setCharData] = useState({} as CharData);

  const [charLevel, setCharLevel] = useState(99);
  const [attrs, dispatchAttrs] = useReducer(attrsReducer, attrsInit);
  const [attrPoints, setAttrPoints] = useState(0);

  const [quests, dispatchQuests] = useReducer(questsReducer, questsInit);

  const [skills, dispatchSkills] = useReducer(skillsReducer, []);
  const [skillPoints, setSkillPoints] = useState(0);

  //const [newGear, dispatchGear] = useReducer(gearReducer, gearInit);

  //const [items, dispatchItems] = useReducer(itemsReducer, itemsInit);

  const [isLoading, setIsLoading] = useState(false);

  //props
  const plannerContextProps: PlannerContext = {
    charClass, charData,

    planner, setPlanner,

    charLevel, setCharLevel,
    attrs, dispatchAttrs,
    attrPoints, setAttrPoints,

    quests, dispatchQuests,

    skills, dispatchSkills,
    skillPoints, setSkillPoints,

    //newGear, dispatchGear,

    //items, dispatchItems
  }

  //on mount: retrieve character data
  useEffect(() => {
    setIsLoading(true);
    (async function () {
      try {
        //const response = await fetch(`https://d2calc-24ee1-default-rtdb.firebaseio.com/class/${charClass}.json`);
        const response = await fetch(`/data/classes/${charClass}.json`);
        const data = await response.json();
        const { skills, stats }: CharData = data;

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
          initialState: skills.list
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
      {!isLoading && !!Object.keys(charData).length ?
        <PlannerContext.Provider value={plannerContextProps}>
          <Tabs />
          <Stages />
        </PlannerContext.Provider>
        :
        <div>LOADING DATA...</div>
      }
    </>
  )
}
