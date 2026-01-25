'use client';

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { RootState, AppDispatch } from '@/app/store/store';
import { reorderWidgets, toggleTheme, loadDashboard } from '@/app/store/dashboardSlice';
import { loadFromLocalStorage, saveToLocalStorage } from '@/app/utils/storage';
import { DEMO_WIDGETS, DEMO_TEMPLATES } from '@/app/utils/demoData';
import Widget from './Widget';
import AddWidgetModal from './AddWidgetModal';
import TemplatesModal from './TemplatesModal';
import SettingsModal from './SettingsModal';
import BackupModal from './BackupModal';
import StarField from './StarField';
import Header from './Header';

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const { widgets, theme } = useSelector((state: RootState) => state.dashboard);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showBackup, setShowBackup] = useState(false);

  // Load dashboard from localStorage on mount
  useEffect(() => {
    const savedData = loadFromLocalStorage();
    if (savedData) {
      dispatch(loadDashboard({
        widgets: savedData.widgets,
        theme: savedData.theme,
      }));
    }
    setIsLoading(false);
  }, [dispatch]);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (!isLoading && widgets.length >= 0) {
      saveToLocalStorage({
        widgets,
        theme,
      });
    }
  }, [widgets, theme, isLoading]);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const items = Array.from(widgets);
    const [reorderedItem] = items.splice(source.index, 1);
    items.splice(destination.index, 0, reorderedItem);

    dispatch(reorderWidgets(items));
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const handleLoadDemo = () => {
    dispatch(loadDashboard({
      widgets: DEMO_WIDGETS,
      theme,
    }));
    setShowAddModal(false);
  };

  const handleSelectTemplate = (templateId: string) => {
    // Import template configs dynamically
    import('@/app/utils/templateConfigs').then(({ TEMPLATE_CONFIGS }) => {
      const templateWidgets = TEMPLATE_CONFIGS[templateId] || [];
      if (templateWidgets.length > 0) {
        // Update positions for template widgets based on current widget count
        const widgetsWithUpdatedPositions = templateWidgets.map((widget, index) => ({
          ...widget,
          position: widgets.length + index,
        }));
        // Add all template widgets to the dashboard
        const newDashboard = {
          widgets: [...widgets, ...widgetsWithUpdatedPositions],
          theme,
        };
        dispatch(loadDashboard(newDashboard));
        setShowTemplates(false);
      }
    });
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50'}`}>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 text-slate-900'
    }`}>
      <Header
        onAddWidget={() => setShowAddModal(true)}
        onToggleTheme={handleToggleTheme}
        onClearDashboard={() => {
          dispatch(loadDashboard({
            widgets: [],
            theme,
          }));
        }}
        theme={theme}
      />

      <main className="container mx-auto px-4 py-6">
        {widgets.length === 0 ? (
          <div>
            {/* Main Welcome Section */}
            <div className={`text-center py-12 rounded-3xl border-2 border-dashed transition-all animate-fade-in relative overflow-hidden ${
              theme === 'dark' 
                ? 'border-slate-700 bg-gradient-to-br from-slate-800/50 via-slate-900 to-slate-800/50' 
                : 'border-slate-300 bg-gradient-to-br from-slate-50/50 via-white to-slate-50/50'
            } shadow-2xl`}>
              <StarField />
              <div className="text-9xl mb-6 animate-bounce relative z-10" style={{animationDuration: '2s'}}>📊</div>
              <h2 className="text-5xl font-black mb-3 bg-gradient-to-r from-green-400 via-emerald-400 to-blue-500 bg-clip-text text-transparent relative z-10">
                Welcome to FinBoard
              </h2>
              <p className={`mb-2 text-xl font-semibold relative z-10 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                Your Personal Finance Dashboard
              </p>
              <p className={`mb-10 text-base relative z-10 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                Connect to any financial API and monitor real-time data with custom widgets
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 relative z-10">
                <button
                  onClick={() => setShowAddModal(true)}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center gap-2"
                >
                  <span>✨</span> Create Your First Widget
                </button>
                <button
                  onClick={() => setShowTemplates(true)}
                  className={`px-8 py-4 rounded-xl font-bold text-lg transition transform hover:scale-105 shadow-lg hover:shadow-xl ${
                    theme === 'dark'
                      ? 'bg-slate-700 hover:bg-slate-600 text-white'
                      : 'bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-300'
                  }`}
                >
                  📋 View Templates
                </button>
                <button
                  onClick={handleLoadDemo}
                  className={`px-8 py-4 rounded-xl font-bold text-lg transition transform hover:scale-105 shadow-lg hover:shadow-xl ${
                    theme === 'dark'
                      ? 'bg-blue-700 hover:bg-blue-600 text-white'
                      : 'bg-blue-50 hover:bg-blue-100 text-blue-900 border-2 border-blue-300'
                  }`}
                >
                  🎬 Load Demo
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 max-w-3xl mx-auto relative z-10">
                <button
                  onClick={() => setShowAddModal(true)}
                  className={`p-5 rounded-2xl transition transform hover:scale-105 cursor-pointer hover:shadow-lg ${theme === 'dark' ? 'bg-slate-700 border border-slate-600 hover:border-cyan-500/60 hover:bg-slate-700/80' : 'bg-white shadow-md border border-slate-200 hover:border-cyan-500/60 hover:shadow-cyan-500/20'}`}
                >
                  <div className="text-4xl mb-3">🔗</div>
                  <p className={`text-sm font-bold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                    Connect Any API
                  </p>
                  <p className={`text-xs mt-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                    REST APIs supported
                  </p>
                </button>
                <button
                  onClick={() => setShowSettings(true)}
                  className={`p-5 rounded-2xl transition transform hover:scale-105 cursor-pointer hover:shadow-lg ${theme === 'dark' ? 'bg-slate-700 border border-slate-600 hover:border-cyan-500/60 hover:bg-slate-700/80' : 'bg-white shadow-md border border-slate-200 hover:border-cyan-500/60 hover:shadow-cyan-500/20'}`}
                >
                  <div className="text-4xl mb-3">⚡</div>
                  <p className={`text-sm font-bold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                    Real-time Updates
                  </p>
                  <p className={`text-xs mt-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                    Auto-refresh every 30s
                  </p>
                </button>
                <button
                  onClick={() => setShowBackup(true)}
                  className={`p-5 rounded-2xl transition transform hover:scale-105 cursor-pointer hover:shadow-lg ${theme === 'dark' ? 'bg-slate-700 border border-slate-600 hover:border-cyan-500/60 hover:bg-slate-700/80' : 'bg-white shadow-md border border-slate-200 hover:border-cyan-500/60 hover:shadow-cyan-500/20'}`}
                >
                  <div className="text-4xl mb-3">💾</div>
                  <p className={`text-sm font-bold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                    Auto-saved
                  </p>
                  <p className={`text-xs mt-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                    Data persists locally
                  </p>
                </button>
              </div>
            </div>

            {/* Templates Section */}
            {showTemplates && (
              <div className="mt-16 animate-fade-in">
                <h3 className={`text-4xl font-black mb-10 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  📋 Popular Templates
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {DEMO_TEMPLATES.map((template, idx) => (
                    <button
                      key={template.id}
                      onClick={() => {
                        setShowTemplates(false);
                        setShowAddModal(true);
                      }}
                      className={`p-8 rounded-3xl border-2 transition transform hover:scale-105 hover:shadow-2xl text-left group ${
                        theme === 'dark'
                          ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 hover:border-green-500/50'
                          : 'bg-gradient-to-br from-white to-slate-50 border-slate-200 hover:border-green-500/50'
                      }`}
                      style={{ animationDelay: `${idx * 50}ms` }}
                    >
                      <div className={`bg-gradient-to-br ${template.color} rounded-2xl p-5 w-fit mb-6 group-hover:scale-110 transition shadow-lg`}>
                        <div className="text-4xl">{template.icon}</div>
                      </div>
                      <h4 className={`font-black text-2xl mb-3 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        {template.name}
                      </h4>
                      <p className={`text-base font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                        {template.description}
                      </p>
                      <div className="mt-6 flex items-center gap-2 text-green-500 font-bold opacity-0 group-hover:opacity-100 transition">
                        <span>Use Template</span>
                        <span>→</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="dashboard" type="widget">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={`grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 transition-colors ${
                    snapshot.isDraggingOver ? 'bg-opacity-50' : ''
                  }`}
                >
                  {widgets.map((widget, index) => (
                    <Draggable key={widget.id} draggableId={widget.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`transition-all ${
                            snapshot.isDragging ? 'opacity-50' : 'opacity-100'
                          }`}
                        >
                          <Widget widget={widget} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </main>

      {showAddModal && (
        <AddWidgetModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          theme={theme}
        />
      )}

      {showTemplates && (
        <TemplatesModal
          isOpen={showTemplates}
          onClose={() => setShowTemplates(false)}
          onSelectTemplate={handleSelectTemplate}
          theme={theme}
        />
      )}

      {showSettings && (
        <SettingsModal
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
          theme={theme}
        />
      )}

      {showBackup && (
        <BackupModal
          isOpen={showBackup}
          onClose={() => setShowBackup(false)}
          theme={theme}
        />
      )}
    </div>
  );
}
