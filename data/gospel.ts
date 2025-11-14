import type { Gospel } from '../types';

/**
 * NOTA: Isto é uma simulação para obter o evangelho do dia.
 * Em uma aplicação real, você substituiria estes dados estáticos
 * por uma chamada de API a um serviço que forneça a liturgia diária
 * católica, como o da CNBB ou outro serviço de calendário litúrgico.
 * 
 * A função `getDailyGospel` atualmente percorre uma lista predefinida
 * com base no dia do ano.
 */
const GOSPELS: Gospel[] = [
  {
    passage: "João 3:16-18",
    text: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna. Porque Deus enviou o seu Filho ao mundo, não para que condenasse o mundo, mas para que o mundo fosse salvo por ele. Quem crê nele não é condenado; mas quem não crê já está condenado, porquanto não crê no nome do unigênito Filho de Deus."
  },
  {
    passage: "Lucas 15:11-12",
    text: "E disse: Um certo homem tinha dois filhos; E o mais moço deles disse ao pai: Pai, dá-me a parte dos bens que me pertence. E ele repartiu por eles a fazenda."
  },
  {
    passage: "Mateus 6:9-13",
    text: "Portanto, vós orareis assim: Pai nosso, que estás nos céus, santificado seja o teu nome; venha o teu reino, seja feita a tua vontade, assim na terra como no céu; o pão nosso de cada dia nos dá hoje; e perdoa-nos as nossas dívidas, assim como nós perdoamos aos nossos devedores; e não nos deixes cair em tentação; mas livra-nos do mal; porque teu é o reino, e o poder, e a glória, para sempre. Amém."
  },
  {
    passage: "Marcos 12:30-31",
    text: "Amarás, pois, ao Senhor teu Deus de todo o teu coração, e de toda a tua alma, e de todo o teu entendimento, e de todas as tuas forças; este é o primeiro mandamento. E o segundo, semelhante a este, é: Amarás o teu próximo como a ti mesmo. Não há outro mandamento maior do que estes."
  },
  {
    passage: "João 1:1-5",
    text: "No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus. Ele estava no princípio com Deus. Todas as coisas foram feitas por ele, e sem ele nada do que foi feito se fez. Nele estava a vida, e a vida era a luz dos homens. E a luz resplende nas trevas, e as trevas não a compreenderam."
  },
  {
    passage: "Gálatas 5:22-23",
    text: "Mas o fruto do Espírito é: amor, gozo, paz, longanimidade, benignidade, bondade, fé, mansidão, temperança. Contra estas coisas não há lei."
  },
  {
    passage: "Efésios 2:8-9",
    text: "Porque pela graça sois salvos, por meio da fé; e isto não vem de vós, é dom de Deus. Não vem das obras, para que ninguém se glorie."
  }
];

export const getDailyGospel = (): Gospel => {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  return GOSPELS[dayOfYear % GOSPELS.length];
};