import './DiaryItem.css';
import {useNavigate} from 'react-router';
import {getEmotionImage} from '@/utils/emotion.js';
import Button from '@/components/Button.jsx';
import {useDiaryStore} from '@/stores/useDiaryStore.js';

const DiaryItem = ({id, emotionId, createdDate, content, onDelete}) => {
	const nav = useNavigate();
	const removeDiary = useDiaryStore((state) => state.removeDiary);

	const onClickDelete = async () => {
		await removeDiary(id);
	}

	return (
		<div className={"DiaryItem"}>
      <div
        className={`img_section img_section_${emotionId}`}
        onClick={() => nav(`/diary/${id}`)}>
        <img src={getEmotionImage(emotionId)} />
      </div>
      <div
        className={"info_section"}
        onClick={() => nav(`/diary/${id}`)}>
        <div className={"created_date"}>
          {new Date(createdDate).toLocaleDateString()}
        </div>
        <div className={"content"}>
          {content}
        </div>
      </div>
      <div className={"button_section"}>
        <Button
          text={"수정하기"}
          onClick={() => nav(`/edit/${id}`)} />
        <Button
          text={"삭제하기"}
          type={"NEGATIVE"}
          onClick={onClickDelete}
          />
      </div>
		</div>
	)
}

export default DiaryItem;