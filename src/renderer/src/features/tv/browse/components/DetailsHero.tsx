import MovieExtraInfo from '@renderer/shared/components/MovieExtraInfo';
import { useAppSelector } from '@renderer/shared/hooks/redux_hooks';
import { MovieMetadata, TvMetadata } from 'src/shared';

type Props = {
    item: MovieMetadata | TvMetadata | null;
};

export default function DetailsHero({ item }: Props) {
    const view = useAppSelector((state) => state.view.value);

    if (view === 'movies') {
        item = item as MovieMetadata;
        return (
            <div className='hero'>
                <div className='inner'>
                    <div className='details'>
                        <div className='title'>{item.title}</div>
                        <MovieExtraInfo movie={item} />
                        <div className='overview'>{item.overview}</div>
                    </div>
                </div>
            </div>
        );
    }

    if (view === 'tv') {
        item = item as TvMetadata;
        return (
            <div className='hero'>
                <div className='inner'>
                    <div className='details'>
                        <div className='title'>{item.name}</div>
                        <div className='overview'>{item.overview}</div>
                    </div>
                </div>
            </div>
        );
    }

    return null;
}