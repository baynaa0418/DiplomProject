'use client';

import React, { useState } from 'react';
import PharmacyStockManagement, { StockTransactionDialog } from '../components/stockManagement/StockManagement';


// This component shows how to implement the pharmacy stock management
const PharmacyPage = () => {
  const [transactionDialogOpen, setTransactionDialogOpen] = useState(false);
  
  const handleOpenTransactionDialog = () => {
    setTransactionDialogOpen(true);
  };
  
  const handleCloseTransactionDialog = () => {
    setTransactionDialogOpen(false);
  };
  
  const handleSaveTransaction = (data) => {
    console.log('Transaction data:', data);
    // Here you would usually call an API to save the transaction
    setTransactionDialogOpen(false);
  };
  
  return (
    <>
      {/* Main stock management component */}
      <PharmacyStockManagement onOpenTransaction={handleOpenTransactionDialog} />
      
      {/* Transaction dialog for stock in/out operations */}
      <StockTransactionDialog
        open={transactionDialogOpen}
        onClose={handleCloseTransactionDialog}
        onSave={handleSaveTransaction}
      />
    </>
  );
};

export default PharmacyPage;