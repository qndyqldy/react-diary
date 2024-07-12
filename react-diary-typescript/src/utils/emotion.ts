import emotion1 from '@/assets/emotion1.png';
import emotion2 from '@/assets/emotion2.png';
import emotion3 from '@/assets/emotion3.png';
import emotion4 from '@/assets/emotion4.png';
import emotion5 from '@/assets/emotion5.png';
import {Emotion} from "../types/emotion.ts";

export const emotionList: Emotion[]  = [
	{
		emotionId: 1,
		emotionName: '완전 좋음'
	},
	{
		emotionId: 2,
		emotionName: '좋음'
	},
	{
		emotionId: 3,
		emotionName: '그럭저럭'
	},
	{
		emotionId: 4,
		emotionName: '나쁨'
	},
	{
		emotionId: 5,
		emotionName: '끔찍함'
	},
];

export function getEmotionImage (emotionId: number): string | undefined {
	switch(emotionId) {
		case 1: return emotion1;
		case 2: return emotion2;
		case 3: return emotion3;
		case 4: return emotion4;
		case 5: return emotion5;
		default: return undefined;
	}
}