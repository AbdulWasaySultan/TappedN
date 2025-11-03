import { OutletData } from '../Navigation/navigation';
import React, { useState } from 'react';
import axios from 'axios';

const baseUrl = 'https://mocki.io/v1/dd088399-d145-4745-955b-64b60c9f2692';

export const fetchAllOutlets = async (): 
Promise<OutletData[]> => {
  try {
    const response = await axios.get(baseUrl);
    return response.data.outlets;
  } catch (error) {
    throw error;
  }
};

export const fetchOutletById = async (id: string): Promise<OutletData> => {
  try {
    const response = await axios.get(`${baseUrl}/outlets/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
