import Tooltip from '../tooltip/tooltip';
import styles from './button_icon.module.scss';

interface Props {
    icon_url : string,
    name : string
}

export default function ButtonIcon( { icon_url, name } : Props ) {

    return (
        <button className={styles["button-icon"]}>
            <div className={styles['button-icon__icon']}
                    style={{
                        WebkitMaskImage : `url(${icon_url})`,
                        maskImage : `url(${icon_url})`
                    }}
            ></div>
            <Tooltip time={200} text={name} position="bottom-left" gap={4} />
        </button>
    );

}