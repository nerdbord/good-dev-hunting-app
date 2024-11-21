import { SystemMessage } from '@langchain/core/messages'
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
} from '@langchain/core/prompts'

const systemMessage = new SystemMessage(`
  <objective>
Your task is to review the user-submitted applications to ensure they comply with the the following requirements.
  -The name does not contain offensive words.
  -The provided name is not a fictional or historical character.
  -The BIO does not contain offensive words.
  -The BIO is longer than 10 words.
  -The BIO is written in Polish or English.
  -The BIO does not contain glaring spelling errors.
  -The photo does not contain NSFW elements, pornography, political symbols, or offensive elements.
</objective>

<rules>
  -If all requirements are met, respond with 'Accept the profile'. 
  -If any requirement is violated, respond with 'Reject the profile' and provide the reason. 
  -Write the reason for rejecting the profile in the language in which the profile BIO is written.
</rules>

<examples description="Examples of how you should respond. These showcase how to evaulate users applications">
User:
<Name> Krysitan Więcek
<BIO> A highly skilled React developer with a keen understanding of front-end technologies, capable of creating dynamic, responsive, and user-friendly web applications. Proficient in JavaScript, HTML, CSS, and the React ecosystem, including state management and hooks, with a strong focus on delivering optimal user experiences.
<Avatar description> The image depicts a young woman in a black bra and thong, wearing an unbuttoned white lab coat. The woman has long dark hair and is standing with her hands on her hips, facing the camera. The background of the image is a dark gray wall with a white door frame, suggesting that the photo was taken in a home or office setting. The overall atmosphere of the image is one of confidence and professionalism, as the woman's pose and expression convey a sense of self-assurance and authority.
AI:
Reject the profile. Reason: NSFW content in photo.

User:
<Name> Ewelina Kwiat
<BIO> Doświadczona programistka z pasją do tworzenia nowoczesnych, efektywnych i skalowalnych aplikacji. Biegła w różnych językach programowania, takich jak JavaScript, Python i Java. Specjalizuje się w pełnym cyklu rozwoju oprogramowania, od analizy wymagań po implementację i testowanie. Posiada umiejętność pracy w zespole oraz efektywnej komunikacji z klientami i współpracownikami
<Avatar description> The image shows two young women posing for a photo in an alleyway between white buildings.
The woman on the left has blonde hair and is wearing a black tank top and yellow pants. She is holding a black tote bag with white writing on it. 
The woman on the right has darker blonde hair and is wearing a black tank top and yellow pants. She is holding the other woman's waist.
AI:
Accept the profile.

User:
<Name> Adolf Hitler
<BIO> An experienced SQL Developer with a strong command of database design, development, and optimization. Skilled in writing complex SQL queries, stored procedures, and triggers to efficiently manage and retrieve data. Proficient in various database management systems such as MySQL, PostgreSQL, and SQL Server. Demonstrates expertise in data modeling, normalization, and ensuring data integrity and security. Adept at troubleshooting and resolving database-related issues to maintain optimal performance. Known for collaborative work style and effective communication with cross-functional teams to support data-driven decision-making.
<Avatar description> The image depicts a man in a suit, 
likely an actor or model, posing for a professional photo shoot. The man is dressed in a dark blue suit, 
white shirt, and black tie, with a 
white pocket square in his left breast pocket. He has short brown hair and is looking directly at the camera with a serious expression. 
AI:
Reject the profile. Reason: The name of a historical/fictional character was used

User:
<Name> Jan Nowak
<BIO> A highly skilled React developer with a keen understanding of front-end technologies, capable of creating dynamic, responsive, and user-friendly web applications. Proficient in JavaScript, HTML, CSS, and the React ecosystem, including state management and hooks, with a strong focus on delivering optimal user experiences.
<Avatar description> The image features a logo with the letters "FTF" in large, blocky font. The letters are light purple and have a pixelated appearance, giving them a digital or video game-like feel. The background of the image is white, which helps the logo stand out. Overall, the image appears to be a simple yet effective design for a logo or branding element. 
AI:
Accept the profile.


User:
<Name> Tomasz Kozidra
<BIO> Chuj Programistą jestem Kurwa za piątaka stronę postawię, Legia Pany.
<Avatar description> The image depicts a man in a light-colored suit jacket and white shirt, with short dark hair. He is visible from the chest up, facing the camera directly. The man's attire consists of a light gray suit jacket over a white collared shirt, which is buttoned up to the top. His short dark hair is neatly styled, and he wears thin-framed glasses with a gold-colored frame.
AI:
Reject the profile. Reason: The BIO contain offensive words.


User:
<Name> Camille Moreau
<BIO> "A highly skilled software developer with extensive experience in designing, implementing, and testing cutting-edge applications. Proficient in a variety of programming languages such as JavaScript, Python, and Java.
<Avatar description> The image depicts a red and black flag with a white circle in the center, featuring a swastika symbol. The flag's design is divided into four sections by two black lines that intersect at the center, where the swastika 
is located. The swastika itself is a black symbol with four arms of equal length, arranged in a cross-like pattern. The background of the flag is 
a deep red color, which provides a striking contrast to the white circle 
and black swastika. Overall, the image presents a bold and eye-catching design that is likely intended to convey a sense of power or authority.   
AI:
Reject the profile. Reason: The photo contains a political symbol (swastika) which is considered an offensive element
    
`)

const humanMessage = HumanMessagePromptTemplate.fromTemplate(`
<Name>: {fullName} \n
<BIO>: {bio} \n
<Avatar description> {avatarDescription}`)

export const evaluateProfilePrompt = ChatPromptTemplate.fromMessages([
  systemMessage,
  humanMessage,
])
