import * as React from 'react';
import { School, FamilyRestroom, EscalatorWarning, Favorite, SelfImprovement, Psychology, SportsScore, MoodBad, Groups, AutoStories, Forum, PsychologyAlt, Accessibility, Diversity1, ConnectWithoutContact, NoMeals, PregnantWoman, MoreHoriz, Vaccines, SentimentVeryDissatisfied, Hotel, EmojiPeople } from '@mui/icons-material';
import { FaFistRaised, FaMoneyBill, FaPeopleArrows, FaBalanceScale, FaRegSadTear } from "react-icons/fa";

const iconMap = {
    "school": <School/>,
    "family": <FamilyRestroom/>,
    "child-protection": <EscalatorWarning/>,
    "health": <Favorite/>,
    "me": <SelfImprovement/>,
    "school_stress": <Psychology/>,
    "school_motivation": <SportsScore/>,
    "school_anxious": <MoodBad/>,
    "school_mobbing": <Groups/>,
    "school_learning": <AutoStories/>,
    "school_argument": <Forum/>,
    "school_violence": <FaFistRaised/>,
    "family_anxious": <MoodBad/>,
    "family_argument": <Forum/>,
    "family_money": <FaMoneyBill/>,
    "family_neglect": <FaPeopleArrows/>,
    "family_stress": <Psychology/>,
    "family_violence": <FaFistRaised/>,
    "child-protection_neglect": <FaPeopleArrows/>,
    "child-protection_physical_violence": <FaFistRaised/>,
    "child-protection_psychological_violence": <PsychologyAlt/>,
    "health_physical": <Accessibility/>,
    "health_psychological": <Psychology/>,
    "me_argument": <Forum/>,
    "me_crime": <FaBalanceScale/>,
    "me_sexual_orientation": <Diversity1/>,
    "me_social_media": <ConnectWithoutContact/>,
    "me_stress": <Psychology/>,
    "me_alone": <EmojiPeople/>,
    "health_physical_eating_disorder": <NoMeals/>,
    "health_physical_selfharm": <FaRegSadTear/>,
    "health_physical_pregnancy": <PregnantWoman/>,
    "health_physical_violence": <FaFistRaised/>,
    "health_physical_other": <MoreHoriz/>,
    "health_psychological_eating_disorder": <NoMeals/>,
    "health_psychological_selfharm": <FaRegSadTear/>,
    "health_psychological_anxious": <MoodBad/>,
    "health_psychological_compulsion": <PsychologyAlt/>,
    "health_psychological_addiction": <Vaccines/>,
    "health_psychological_stress": <Psychology/>,
    "health_psychological_suicide": <FaRegSadTear/>,
    "health_psychological_depression": <SentimentVeryDissatisfied/>,
    "health_psychological_mobbing": <Groups/>,
    "health_psychological_pregnancy": <PregnantWoman/>,
    "health_psychological_sleep": <Hotel/>
};

function MUIIconFactory( { name } ) {
    return iconMap[name] || <></>
}

export default MUIIconFactory;