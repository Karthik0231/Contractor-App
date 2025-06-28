import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';

// Dummy screen components
const HomeRoute = () => <Text style={{ padding: 20 }}>🏠 Home</Text>;
const ProjectsRoute = () => <Text style={{ padding: 20 }}>📁 Projects</Text>;
const SubcontractorsRoute = () => <Text style={{ padding: 20 }}>👷 Subcontractors</Text>;
const PaymentsRoute = () => <Text style={{ padding: 20 }}>💰 Payments</Text>;
const ReportsRoute = () => <Text style={{ padding: 20 }}>📊 Reports</Text>;

const MyComponent = () => {
  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    {
      key: 'home',
      title: 'Home',
      focusedIcon: 'view-dashboard',
      unfocusedIcon: 'view-dashboard-outline',
    },
    {
      key: 'projects',
      title: 'Projects',
      focusedIcon: 'file-document',
      unfocusedIcon: 'file-document-outline',
    },
    {
      key: 'subcontractors',
      title: 'contractors',
      focusedIcon: 'account-group',
      unfocusedIcon: 'account-group-outline',
    },
    // {
    //   key: 'payments',
    //   title: 'Payments',
    //   focusedIcon: 'cash-multiple',
    //   unfocusedIcon: 'cash-multiple',
    // },
    {
      key: 'reports',
      title: 'Reports',
      focusedIcon: 'chart-bar',
      unfocusedIcon: 'chart-bar',
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    projects: ProjectsRoute,
    subcontractors: SubcontractorsRoute,
    payments: PaymentsRoute,
    reports: ReportsRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default MyComponent;
