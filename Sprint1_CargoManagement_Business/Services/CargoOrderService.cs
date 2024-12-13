using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Sprint1_CargoManagement_Data.Repository;
using Sprint1_CargoManagement_Entity;

namespace Sprint1_CargoManagement_Business.Services
{
    public class CargoOrderService
    {
        ICargoOrderRepo _cargoOrderRepo;
        public CargoOrderService(ICargoOrderRepo cargoOrderRepo)
        {
            _cargoOrderRepo = cargoOrderRepo;
        }

        public object DeleteCargoOrderById(int orderId)
        {
            return _cargoOrderRepo.DeleteCargoOrderById(orderId);
        }

        public CargoOrder CreateANewCargoOrder(CargoOrder cargoOrder)
        {
            return _cargoOrderRepo.CreateANewCargoOrder(cargoOrder);
        }

        public List<CargoOrder> GetAllCargoOrders()
        {
            return _cargoOrderRepo.GetAllCargoOrders();


        }

        public List<CargoOrder> GetCargoOrderByAddress(string address)
        {
            return _cargoOrderRepo.GetCargoOrderByAddress(address);


        }
        public List<CargoOrder> GetCargoOrderByStatus(string status)
        {
            return _cargoOrderRepo.GetCargoOrderByStatus(status);

        }

        public object UpdateCargoOrder(CargoOrder cargoOrder)
        {
           return _cargoOrderRepo.UpdateCargoOrder(cargoOrder);
        }

        public double CalculateCargoPrice(double weight, double distance, string cargoType)
        {
            double basePricePerKg = 2.5;
            double additionalChargePerKg = 0.75;
            double additionalChargeThreshold = 100;

            double basePrice = weight * basePricePerKg;

            // Add additional charges for weights above the threshold
            if (weight > additionalChargeThreshold)
            {
                double additionalWeight = weight - additionalChargeThreshold;
                double additionalCharges = additionalWeight * additionalChargePerKg;
                basePrice += additionalCharges;
            }

            // Apply distance-based charges (assuming a flat rate per unit distance)
            double distanceChargePerUnit = 0.1; 
            double distanceCharge = distance * distanceChargePerUnit;
            basePrice += distanceCharge;

            // Apply special pricing based on cargo type
            switch (cargoType.ToLower())
            {
                case "GeneralCargo":
                    basePrice *= 1.2; // Example: apply a 20% markup for GeneralCargo items
                    break;
                case "BulkCargo":
                    basePrice *= 1.5; // Example: apply a 50% markup for BulkCargo items
                    break;
                case "Fragile":
                    basePrice *= 1.7; // Example: apply a 70% markup for Fragile items
                    break;
                default:
                    break;
            }

            return Math.Round(basePrice, 2); // Round the final price to 2 decimal places
        }

    }
}
