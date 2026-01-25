import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/store/store';
import { updateWidgetData, setWidgetLoading, setWidgetError } from '@/app/store/dashboardSlice';
import { fetchApiData } from '@/app/utils/api';

export const useWidgetData = (widgetId: string, apiUrl: string, refreshInterval: number = 30) => {
  const dispatch = useDispatch<AppDispatch>();

  const fetchData = useCallback(async () => {
    if (!apiUrl) return;

    dispatch(setWidgetLoading(widgetId));

    try {
      const data = await fetchApiData(apiUrl, true);
      dispatch(updateWidgetData({ id: widgetId, data }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      dispatch(setWidgetError({ id: widgetId, error: errorMessage }));
    }
  }, [widgetId, apiUrl, dispatch]);

  useEffect(() => {
    // Initial fetch
    fetchData();

    // Set up interval for refreshing
    const intervalId = setInterval(fetchData, refreshInterval * 1000);

    return () => clearInterval(intervalId);
  }, [fetchData, refreshInterval]);

  return fetchData;
};
