import 'package:flutter/material.dart';

void main() {
  runApp(const KisanConnectApp());
}

class KisanConnectApp extends StatelessWidget {
  const KisanConnectApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'KisanConnect',
      theme: ThemeData(
        primarySwatch: Colors.green,
      ),
      home: const HomeScreen(),
    );
  }
}

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('KisanConnect Dashboard'),
      ),
      body: const Center(
        child: Text('Welcome to KisanConnect: Equipment & Labor Forecasting'),
      ),
    );
  }
}
