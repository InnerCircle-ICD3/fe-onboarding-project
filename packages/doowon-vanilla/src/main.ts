import './style.css';

// 페이지 가져오기
import { renderHomePage } from './pages/home';

/**
 * 애플리케이션 초기화 함수
 */
function initApp(): void {
  try {
    // 앱 컨테이너 가져오기
    const appContainer = document.querySelector<HTMLDivElement>('#app');
    if (!appContainer) {
      throw new Error('앱 컨테이너를 찾을 수 없습니다.');
    }
    
    // 홈 페이지 렌더링
    renderHomePage(appContainer);
    
    console.log('애플리케이션이 성공적으로 초기화되었습니다.');
  } catch (error) {
    console.error('애플리케이션 초기화 중 오류 발생:', error);
  }
}

// 애플리케이션 시작
initApp();
