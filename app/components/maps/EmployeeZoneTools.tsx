import { useState, type FC } from 'react';

interface EmployeeZone {
  id: string;
  name: string;
  employeeId: string;
  color: string;
  paths: Array<{ lat: number; lng: number }>;
}

interface Employee {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

interface EmployeeZoneToolsProps {
  employeeZones: EmployeeZone[];
  employees: Employee[];
  selectedZone: string | null;
  drawingMode: boolean;
  onDrawZone: () => void;
  onSelectZone: (zoneId: string | null) => void;
  onDeleteZone: (zoneId: string) => void;
  onNavigateBack?: () => void;
  onCancelDrawing: () => void;
}

export const EmployeeZoneTools: FC<EmployeeZoneToolsProps> = ({
  employeeZones,
  employees,
  selectedZone,
  drawingMode,
  onDrawZone,
  onSelectZone,
  onDeleteZone,
  onNavigateBack,
  onCancelDrawing
}) => {
  const [panelExpanded, setPanelExpanded] = useState(false);

  // Helper to get employee name by ID
  const getEmployeeName = (employeeId: string) => {
    const employee = employees.find(emp => emp.id === employeeId);
    return employee ? employee.name : 'Unassigned';
  };

  return (
    <div className={`absolute top-0 left-0 h-full z-10 transition-all duration-300 ease-in-out ${panelExpanded ? 'translate-x-0' : '-translate-x-[calc(100%-3rem)]'} flex shadow-lg`}>
      {/* Panel Content */}
      <div className="h-full w-80 bg-white dark:bg-neutral-800 border-r border-gray-200 dark:border-neutral-700">
        <div className="h-full p-4 overflow-y-auto">
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Employee Zone Tools</h3>
              <button 
                type="button"
                onClick={() => setPanelExpanded(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                aria-label="Close panel"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <title>Close panel</title>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Zone Drawing Button */}
            <button
              type="button"
              onClick={drawingMode ? onCancelDrawing : onDrawZone}
              className={`py-3 px-4 rounded-lg text-white font-medium text-sm ${
                drawingMode 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : 'bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600'
              } shadow-sm transition-all duration-200`}
            >
              {drawingMode ? 'Cancel Drawing' : 'Draw New Zone'}
            </button>
            
            {/* Zone List */}
            <div className="mt-6 flex-grow">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                <span>Existing Zones</span>
                <span className="ml-2 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 text-xs py-0.5 px-2 rounded-full">{employeeZones.length}</span>
              </h4>
              
              <div className="space-y-3 max-h-[calc(100%-8rem)] overflow-y-auto pr-1">
                {employeeZones.map(zone => (
                  <button
                    type="button"
                    key={zone.id}
                    className={`relative p-3 rounded-lg border transition-all w-full text-left ${selectedZone === zone.id 
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900 dark:bg-opacity-20 shadow-md' 
                      : 'border-gray-200 dark:border-neutral-700 hover:border-primary-300 hover:bg-gray-50 dark:hover:bg-neutral-700'}`}
                    onClick={() => onSelectZone(zone.id === selectedZone ? null : zone.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        onSelectZone(zone.id === selectedZone ? null : zone.id);
                      }
                    }}
                    aria-label={`Zone: ${zone.name}`}
                  >
                    <div className="flex items-center mb-1">
                      <div style={{ backgroundColor: zone.color }} className="w-4 h-4 rounded-full mr-2" />
                      <h5 className="font-medium text-gray-900 dark:text-gray-100">{zone.name}</h5>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Assigned to: {getEmployeeName(zone.employeeId)}</p>
                    
                    {/* Action buttons */}
                    <div className="flex justify-end mt-2">
                      <button
                        type="button"
                        className={`text-xs px-2 py-1 rounded ${selectedZone === zone.id 
                          ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300' 
                          : 'bg-gray-100 dark:bg-neutral-700 text-gray-700 dark:text-gray-300'} mr-2`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectZone(zone.id);
                        }}
                      >
                        {selectedZone === zone.id ? 'Selected' : 'Select'}
                      </button>
                      <button
                        type="button"
                        className="text-xs px-2 py-1 rounded bg-red-100 dark:bg-red-900 dark:bg-opacity-30 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteZone(zone.id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </button>
                ))}
                
                {employeeZones.length === 0 && (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <svg className="w-12 h-12 mx-auto mb-2 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <title>No zones</title>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    <p className="text-sm">No zones created yet</p>
                    <p className="text-xs mt-1">Click "Draw New Zone" to get started</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Panel Tab with Controls */}
      <div className="h-full w-12 bg-white bg-opacity-90 dark:bg-neutral-800 dark:bg-opacity-90 flex flex-col items-center py-4 border-r border-gray-200 dark:border-neutral-700">
        {/* Add/Cancel Zone Button */}
        <button
          type="button"
          onClick={drawingMode ? onCancelDrawing : onDrawZone}
          className={`w-8 h-8 rounded-full flex items-center justify-center text-white shadow-sm ${
            drawingMode 
              ? 'bg-red-600 hover:bg-red-700' 
              : 'bg-primary-600 hover:bg-primary-700'
          } transition-colors`}
          aria-label={drawingMode ? "Cancel drawing" : "Add new zone"}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <title>{drawingMode ? "Cancel drawing" : "Add new zone"}</title>
            {drawingMode ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            )}
          </svg>
        </button>
        
        {/* Toggle Panel Button */}
        <button 
          type="button"
          className="mt-auto w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors"
          onClick={() => setPanelExpanded(!panelExpanded)}
          aria-label={panelExpanded ? "Collapse zone panel" : "Expand zone panel"}
        >
          <svg className={`w-5 h-5 transform transition-transform ${panelExpanded ? 'rotate-180' : 'rotate-0'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <title>{panelExpanded ? "Collapse panel" : "Expand panel"}</title>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export const DrawingControls: FC<{
  drawingMode: boolean;
  onCancelDrawing: () => void;
}> = ({ drawingMode, onCancelDrawing }) => {
  if (!drawingMode) return null;
  
  return (
    <>
      {/* Drawing Mode Instructions */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 bg-white dark:bg-neutral-800 rounded-full shadow-lg py-2 px-4 pointer-events-none animate-pulse">
        <p className="text-sm text-center flex items-center">
          <span className="w-2 h-2 bg-primary-500 rounded-full mr-2" />
          <span className="font-medium">Click on the map to draw your zone</span>
        </p>
      </div>
    </>
  );
}; 