import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

// Define the base URL for the API
export const BASE_URL = 'https://deploying-myduka-backend.onrender.com/';

export default function ClerkDashboard() {
  // State hook to store the list of products
  const [products, setProducts] = useState([]);

  // Effect hook to fetch products when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch(`${BASE_URL}/store/products`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setProducts(data);
    })
    .catch(error => {
      console.error('Error fetching products:', error);
    });
  }, []);

  const handleDelete = (storeId, productId) => {
    const token = localStorage.getItem('token');

    fetch(`${BASE_URL}/store/${storeId}/products/${productId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setProducts(products.filter(product => product.id !== productId));
    })
    .catch(error => {
      console.error('Error deleting product:', error);
    });
  };

  // Styles for the component
  const styles = {
    container: {
      padding: "20px",
      maxWidth: "100%",
      overflowX: "hidden"
    },
    header: {
      marginBottom: "20px",
    },
    headerInner: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "black", // Set the container color to black
      color: "white",
      padding: "10px",
      borderRadius: "5px"
    },
    headerTitle: {
      fontWeight: "bold",
      color: "white" // Set the text color of "My Products" to white
    },
    button: {
      cursor: "pointer",
      textDecoration: "none"
    },
    table: {
      backgroundColor: "#f5f5f5",
    },
    tableHeader: {
      backgroundColor: "#e0e0e0",
    },
    tableCell: {
      color: "#333",
    },
    deleteButton: {
      color: "#b91c1c" // Set the delete icon color to red-700
    },
    addButton: {
      backgroundColor: "#b91c1c", // Set the "Add Product" button color to red-700
      color: "white",
      borderRadius: "8px",
      padding: "8px 16px",
      '&:hover': {
        backgroundColor: "#991b1b" // Darker red for hover state
      }
    }
  };

  return (
    <div style={styles.container}>
      {/* Header section with a title and a button to add a new product */}
      <div style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.headerTitle}>My Products</div>
          <Link to="/clerk/register-product" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              sx={styles.addButton} // Apply red color to the button
            >
              Add Product
            </Button>
          </Link>
        </div>
      </div>

      {/* Table to display the list of products */}
      <TableContainer component={Paper}>
        <Table sx={styles.table} aria-label="simple table">
          <TableHead sx={styles.tableHeader}>
            <TableRow>
              <TableCell sx={styles.tableCell}>Name</TableCell>
              <TableCell align="right" sx={styles.tableCell}>Price ($)</TableCell>
              <TableCell align="right" sx={styles.tableCell}>Stock Quantity</TableCell>
              <TableCell align="right" sx={styles.tableCell}>Buying Price ($)</TableCell>
              <TableCell align="right" sx={styles.tableCell}>Selling Price ($)</TableCell>
              <TableCell align="right" sx={styles.tableCell}>Store ID</TableCell>
              <TableCell align="center" sx={styles.tableCell}>Image</TableCell>
              <TableCell align="center" sx={styles.tableCell}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Map over the products and create a table row for each product */}
            {products.map((product) => (
              <TableRow
                key={product.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" sx={styles.tableCell}>
                  {product.name}
                </TableCell>
                <TableCell align="right" sx={styles.tableCell}>{product.price}</TableCell>
                <TableCell align="right" sx={styles.tableCell}>{product.stock_quantity}</TableCell>
                <TableCell align="right" sx={styles.tableCell}>{product.buying_price}</TableCell>
                <TableCell align="right" sx={styles.tableCell}>{product.selling_price}</TableCell>
                <TableCell align="right" sx={styles.tableCell}>{product.store_id}</TableCell>
                <TableCell align="center" sx={styles.tableCell}>
                  <img src={product.image} alt="product image" width="50px" />
                </TableCell>
                <TableCell align="center" sx={styles.tableCell}>
                  <IconButton 
                    onClick={() => handleDelete(product.store_id, product.id)} 
                    sx={styles.deleteButton} // Apply red color to delete button
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
