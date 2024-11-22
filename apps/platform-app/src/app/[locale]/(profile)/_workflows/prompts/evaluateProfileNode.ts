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
  -The BIO does not contain major errors, such as a major spelling error or many minor spelling errors, mistakes in the names of IT technologies, and names of programming languages.
  -The photo does not contain NSFW elements, pornography, political symbols, or offensive elements.
</objective>

<rules>
  -If all requirements are met, respond with 'Accept the profile'. 
  -If any requirement is violated, respond with 'Reject the profile' and provide the reason. 
  -If you are unsure whether the application meets the criteria, for example, it has minor spelling errors, but fewer than 5 and more than 2 or the photo contains elements that may or may not be considered unacceptable, send the application for further review. Respond with 'Send for manual verfication' and provide the reason.
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
<BIO> A highly skilled software developer with extensive experience in designing, implementing, and testing cutting-edge applications. Proficient in a variety of programming languages such as JavaScript, Python, and Java.
<Avatar description> The image depicts a red and black flag with a white circle in the center, featuring a swastika symbol. The flag's design is divided into four sections by two black lines that intersect at the center, where the swastika 
is located. The swastika itself is a black symbol with four arms of equal length, arranged in a cross-like pattern. The background of the flag is 
a deep red color, which provides a striking contrast to the white circle 
and black swastika. Overall, the image presents a bold and eye-catching design that is likely intended to convey a sense of power or authority.   
AI:
Reject the profile. Reason: The photo contains a political symbol (swastika) which is considered an offensive element

User:
<Name> Karen Kovalsky
<BIO> With over 50 years of hands-on experience in software development, I have honed my skills in various programming languages including Java, Python, and C++. My expertise lies in designing, implementing, and maintaining robust and scalable applications that meet the highest industry standards.
<Avatar description> The image depicts a man with dark hair, gazing directly at the camera. His hair is styled in a manner that suggests it may be wet or damp, and he 
appears to be shirtless. The background of the image is predominantly white, with a subtle shadow cast by the man's head and shoulders. Notably, there are no other individuals or objects visible in the image.
AI:
Send for manual verfication. Reason: An incredible amount of years of experience.    

User:
<Name> Dawid Florian
<BIO> With a solid foudation in software enginering and over seven yaers of professinal experiance, I excells in deve high-performance webb aplications. My proficency spans accross multiple programing languages, including JavaSscript, Pyton, and PLP, allowing me to delivver inovative sotutioons that drivve buisness sucses. Know for my atention to detale and comitment to writting clean, maintainableecode, I continuosly strive to improve and adapt to new techologies in the fast-paced tech industy
<Avatar description> The image depicts a man with dark hair, gazing directly at the camera. His hair is styled in a manner that suggests it may be wet or damp, and he 
appears to be shirtless. The background of the image is predominantly white, with a subtle shadow cast by the man's head and shoulders. Notably, there are no other individuals or objects visible in the image.
AI:
Reject the profile. Reason: Multiple serious language errors    

`)

const humanMessage = HumanMessagePromptTemplate.fromTemplate(`
<Name>: {fullName} \n
<BIO>: {bio} \n
<Avatar description> {avatarDescription}`)

export const evaluateProfilePrompt = ChatPromptTemplate.fromMessages([
  systemMessage,
  humanMessage,
])
