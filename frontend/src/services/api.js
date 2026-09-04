import fallbackData from '../data/safetyTips.json';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Fetches Safety Panel data from Express Backend API.
 * Automatically falls back to local static JSON if backend is offline.
 */
export async function fetchSafetyPanelData() {
  try {
    const response = await fetch(`${API_BASE_URL}/safety-panel`, {
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    if (result.success && result.data) {
      return {
        data: result.data,
        isLiveApi: true,
      };
    }
    throw new Error('API response missing expected data format');
  } catch (error) {
    console.warn('⚠️ Express Backend API unreachable. Using static JSON fallback:', error.message);
    return {
      data: fallbackData,
      isLiveApi: false,
    };
  }
}
