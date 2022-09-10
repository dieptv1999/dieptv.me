import styles from './MdxWidgets.module.css';
import { useTheme } from '../ThemeProvider';

export const CompileHtml = ({children}) => {
  const {themeId} = useTheme();

  return (
    <div className={styles.compileHtml}>
      {children}
    </div>
  );
};