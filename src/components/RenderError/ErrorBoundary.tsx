import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

type Props = {
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
  error: any;
  errorInfo: any;
};

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: any) {
    console.error('[ErrorBoundary] getDerivedStateFromError:', error);
    return { hasError: true, error };
  }

  componentDidCatch(error: any, info: any) {
    console.error('[ErrorBoundary] componentDidCatch:', error);
    console.error('[ErrorBoundary] Error Info:', info);
    this.setState({ errorInfo: info });
  }

  render() {
    if (this.state.hasError) {
      return (
        <ScrollView style={styles.container}>
          <View style={styles.container}>
            <Text style={styles.title}>⚠️ Something went wrong</Text>
            <Text style={styles.error}>{String(this.state.error)}</Text>
            {this.state.errorInfo && (
              <Text style={styles.stack}>{this.state.errorInfo.componentStack}</Text>
            )}
          </View>
        </ScrollView>
      );
    }
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: 'red',
  },
  error: {
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
    marginBottom: 8,
  },
  stack: {
    fontSize: 12,
    textAlign: 'left',
    color: '#666',
    backgroundColor: '#f0f0f0',
    padding: 8,
  },
});
