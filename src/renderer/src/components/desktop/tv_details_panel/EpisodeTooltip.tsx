import { Episode } from 'src/shared';
import '../../../styles/episode_tooltip.scss';
import { episodeInMediaSet, episodeMediaId, tmdbImg } from '@renderer/helpers';
import { CheckCircle, CheckCircleSolid, PlaySolid } from 'iconoir-react';
import { playFile } from '@renderer/ipcActions';
import { useAppDispatch, useAppSelector } from '@renderer/hooks';
import { unwatch, watch } from '@renderer/state/mediaSetsSlice';

type Props = {
    visible: boolean;
    episode: Episode;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
};

export default function EpisodeTooltip({
    visible,
    episode,
    onMouseEnter,
    onMouseLeave,
}: Props) {
    const watchedList = useAppSelector((state) => state.media_sets.watched);
    const watched = episodeInMediaSet(episode.show_id, watchedList, episode.id);
    const dispatch = useAppDispatch();

    function toggleWatched() {
        if (!episode) return;
        
        const id = episodeMediaId(episode.show_id, episode.id);
        watched ? dispatch(unwatch(id)) : dispatch(watch(id));
    }

    return (
        <div
            className={`episode-tooltip ${visible ? 'visible' : ''}`}
            style={
                episode.still_path ? tmdbImg(episode.still_path, 'w185') : {}
            }
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div className='content'>
                <div className='top'>
                    <div className='number'>{episode.episode_number}</div>
                    <div className='title'>{episode.name}</div>
                </div>
                <div className='overview'>{episode.overview}</div>
                <div className='buttons'>
                    <button
                        className='set-watched secondary click-bop'
                        onClick={toggleWatched}
                    >
                        <div className='icon'>
                            {watched ? <CheckCircleSolid /> : <CheckCircle />}
                        </div>
                        <div className='text'>
                            {watched ? 'Set Not Watched' : 'Set Watched'}
                        </div>
                    </button>
                    <button
                        className='play'
                        onClick={() => playFile(episode.file_path!)}
                    >
                        <div className='icon'>
                            <PlaySolid />
                        </div>
                        <div className='text'>Play</div>
                    </button>
                </div>
            </div>
        </div>
    );
}
