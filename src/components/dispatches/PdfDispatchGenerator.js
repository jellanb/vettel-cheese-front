import {Fragment} from "react";
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFViewer,
    Image,
} from "@react-pdf/renderer";
import logo from '../../img/logoVettel.jpg'
import moment from "moment/moment";


const styles = StyleSheet.create({
    page: {
        backgroundColor: "#FFF9F9",
        color: "white",
        border: "1px solid #000",
    },
    rowInfo: {
        flexDirection: 'row',
        paddingTop: "12px",
        paddingLeft:"10px",
    },
    header: {
        borderTop: 'none',
    },
    boldInfo: {
        fontWeight: 'bold',
    },
    row1Info: {
        width: "300px",
        height: "120px",
        border: "2px solid red",
        textAlign: "center",
        paddingTop:"12px",
        color: "red",
    },
    row2Info: {
        width: "10px",
    },
    row3Info: {
        width: "250px",
        height: "130px",
        textAlign: "center",
        color:"black",
    },
    text1:{
        flexWrap:"wrap-reverse"
    },
    text2:{
        fontSize:12,
        fontStyle:"sans-serif",
    },
    text3:{
        fontSize:10,
        fontStyle:"sans-serif",
        paddingTop:"5px",
        marginTop:"5px",
    },
    text4:{
        fontSize:12,
        color:"black",
        textIndent:20,
        paddingRight:"25px",
        paddingLeft:"30px",
        paddingTop:"5px",
        marginTop:"5px",
        textAlign:"center"
    },
    image:{
        marginBottom: 10,
        height:32,
        width:52,
    },
    viewer: {
        width: window.innerWidth,
        height: window.innerHeight,
    },
    table: {
        width: '100%',
    },
    bold: {
        fontWeight: 'bold',
    },
    rowProducts: {
        color:"black",
        display: 'flex',
        flexDirection: 'row',
        fontSize:11,
    },



    header1DispatchInfo: {
        marginRight:"10px",
        marginLeft:"10px",
        borderTop:"2px",
        paddingLeft:"5px",
        paddingRight:"5px",
        borderLeft:"1px solid black",
        borderRight:"1px solid black",
        paddingTop: "2px",
        paddingBottom:"2px",
        width: '100%',
        borderBottom:"1px",
        textAlign:"center"
    },
    footerDispatchInfo: {
        marginRight:"10px",
        marginLeft:"10px",
        borderTop:"1px",
        paddingLeft:"5px",
        paddingRight:"5px",
        borderLeft:"1px solid black",
        borderRight:"1px solid black",
        paddingTop: "0px",
        paddingBottom: 0,
        width: '100%',
        borderBottom:"1px",
        textAlign:"center",
        marginBottom:"5px"
    },
    rowDispatchInfo: {
        color:"black",
        display: 'flex',
        flexDirection: 'row',
        fontSize:11,
    },
    row1DispatchInfo: {
        marginLeft:"10px",
        borderLeft:"1px solid black",
        paddingLeft:"5px",
        paddingRight:"5px",
        paddingTop: 1,
        paddingBottom: 1,
        width: '40%',
        borderRight:"1px solid black",
        fontWeight:"bold"
    },
    row2DispatchInfo: {
        marginLeft:"10px",
        marginRight:"10px",
        paddingLeft:"5px",
        paddingRight:"5px",
        paddingTop: 1,
        paddingBottom: 1,
        width: '60%',
        borderRight:"1px solid black",
        fontWeight:"bold"
    },



    header1Products: {
        marginLeft:"10px",
        borderTop:"2px",
        paddingLeft:"5px",
        paddingRight:"5px",
        borderLeft:"1px solid black",
        borderRight:"1px solid black",
        paddingTop: "10px",
        paddingBottom: 8,
        width: '20%',
        borderBottom:"1px"
    },
    header2Products: {
        borderTop:"2px",
        paddingLeft:"5px",
        paddingRight:"5px",
        paddingTop: 10,
        paddingBottom: 8,
        width: '20%',
        borderBottom:"1px",
        borderRight:"1px solid black",
    },
    header3Products: {
        borderTop:"2px",
        paddingLeft:"5px",
        paddingRight:"5px",
        paddingTop: 10,
        paddingBottom: 8,
        width: '60%',
        borderBottom:"1px",
        borderRight:"1px solid black",

    },
    header4Products: {
        borderTop:"2px",
        paddingLeft:"5px",
        paddingRight:"5px",
        paddingTop: 10,
        paddingBottom: 8,
        width: '20%',
        borderBottom:"1px",
        borderRight:"1px solid black",
    },
    header5Products: {
        marginRight:"10px",
        borderTop:"2px",
        paddingLeft:"5px",
        paddingRight:"5px",
        paddingTop: 10,
        paddingBottom: 8,
        width: '20%',
        borderBottom:"1px",
        borderRight:"1px solid black",
    },



    row1Products: {
        marginLeft:"10px",
        borderLeft:"1px solid black",
        paddingLeft:"5px",
        paddingRight:"5px",
        paddingTop: 10,
        paddingBottom: 8,
        width: '20%',
        borderRight:"1px solid black",
    },
    row2Products: {
        paddingLeft:"5px",
        paddingRight:"5px",
        paddingTop: 10,
        paddingBottom: 8,
        width: '10%',
        borderRight:"1px solid black",
    },
    row3Products: {
        paddingLeft:"5px",
        paddingRight:"5px",
        paddingTop: 10,
        paddingBottom: 8,
        width: '60%',
        borderRight:"1px solid black",
    },
    row4Products: {
        paddingLeft:"5px",
        paddingRight:"5px",
        paddingTop: 10,
        paddingBottom: 8,
        width: '20%',
        borderRight:"1px solid black",
    },
    row5Products: {
        marginRight:"10px",
        paddingLeft:"5px",
        paddingRight:"5px",
        paddingTop: 10,
        paddingBottom: 8,
        width: '20%',
        borderRight:"1px solid black",
    },


    tableDummy:{
        width: "500px",
        height: "120px",
        border: "1px solid Black",
        textAlign: "center",
        paddingTop:"12px",
        color: "Black",
    },

    row1ResumeAmount: {
        borderTop:"1px solid black",
        borderBottom:"1px solid black",
        borderLeft:"1px solid black",
        paddingLeft:"5px",
        paddingRight:"5px",
        paddingTop: "5px",
        paddingBottom: "5px",
        width: '50%',
        borderRight:"1px solid black",
    },
    row2ResumeAmount: {
        borderTop:"1px solid black",
        borderBottom:"1px solid black",
        borderLeft:"1px solid black",
        paddingLeft:"5px",
        paddingRight:"5px",
        paddingTop: "5px",
        paddingBottom: "5px",
        width: '50%',
        marginRight:"10px",
        borderRight:"1px solid black",
    },
});


export default function PdfDispatchGenerator({orderDetails}){
    function toDate(dateStr) {
        const dateString = moment(dateStr).format('YYYY-MM-DD');
        return dateString
    };

    const businessInfo = [
        {label:"SEÑORES :", info:"Quesos Vettel LTDA"},
        {label:"R.U.T :", info:"76.966.582-K"},
        {label:"GIRO :", info:"Comercial"},
        {label:"DIRECCIÓN :", info:"Freire 935"},
        {label:"COMUNA :", info:"LA CALERA"},
        {label:"CIUDAD :", info:"LA CALERA"},
        {label:"FECHA EMISIÓN :", info:toDate(orderDetails.Date)},
        {label:"Nº ORDEN :", info:orderDetails.OrderNumber},
        {label:"VENDEDOR :", info:orderDetails.Dispatch.DeliveryName},
        {label:"COND. PAGO :", info:"Credito"},
    ];

    const dispatchLabels = [
        {label:"Dirección de despacho :", info: orderDetails.Dispatch.Address + ", " + orderDetails.Dispatch.AddressNumber},
        {label:"Comuna despacho :", info:orderDetails.Dispatch.Commune},
        {label:"Región :", info:orderDetails.Dispatch.Region},
        {label:"Tipo de traslado :", info:"Particular"},
        {label:"Chofer :", info:"Jellan bozo"},
    ];

    const data = orderDetails.Dispatch.Products.map((item) => {
        return {
            quantity: item.Quantity,
            description: item.Description,
            unitPrice: (item.SaleAmount / item.Quantity),
            total: item.SaleAmount,
        }
    });

    const IVA = (orderDetails.SaleAmount * 19) / 100;
    const netAmount = orderDetails.SaleAmount - IVA;
    const resumeAmounts = [
        {label:"SUBTOTAL :", info:netAmount},
        {label:"DESCUENTO :", info:"0"},
        {label:"NETO :", info:netAmount},
        {label:"IVA 19% :", info:IVA},
        {label:"TOTAL :", info:orderDetails.SaleAmount},
    ];

    console.log(data);

    return (
        <Fragment>
            <PDFViewer style={styles.viewer}>
                {/* Start of the document*/}
                <Document>
                    {/*render a single page*/}
                    <Page size="A4" style={styles.page}>
                        <View style={styles.table}>
                            <View style={[styles.rowInfo, styles.bold, styles.header]}>
                                <Text style={styles.row1Info}>
                                    <Text style={styles.text1}>R.U.T:76.966.582-K {"\n"}{"\n"}</Text>
                                    <Text style={styles.text1}>GUIA DE DESPACHO {"\n"}{"\n"}</Text>
                                    <Text style={styles.text1}>Nº {orderDetails.OrderNumber}{"\n"}</Text>
                                </Text>
                                <Text style={styles.row2Info}></Text>
                                <Text style={styles.row3Info}>
                                    <Text style={styles.text2}>{"\n"}{"QUESOS VETTEL S.A"}{"\n"}</Text>
                                    <Text style={styles.text3}>{"\n"} Elaboración de Quesos venezolanos y sus derivados.</Text>
                                    <Text style={styles.text3}>{"\n"} Teléfono: 9 6857 3532</Text>
                                    <Text style={styles.text3}>{"\n"} Instagram: @quesosvettel{"\n"} </Text>
                                    <Image style={styles.image} src={logo}></Image>
                                </Text>
                            </View>
                        </View>
                        <View>
                            <View style={styles.table}>
                                {businessInfo.map((row, i) => (
                                    <View key={i} style={styles.rowDispatchInfo} wrap={false}>
                                        <Text style={styles.row1DispatchInfo}>{row.label} </Text>
                                        <Text style={styles.row2DispatchInfo}>{row.info} </Text>
                                    </View>

                                ))}
                                <View style={[styles.rowDispatchInfo, styles.bold]}>
                                    <Text style={styles.footerDispatchInfo}></Text>
                                </View>
                            </View>


                            <View style={styles.table}>
                                <View style={[styles.rowDispatchInfo, styles.bold]}>
                                    <Text style={styles.header1DispatchInfo}>Datos de despacho</Text>
                                </View>
                                {dispatchLabels.map((row, i) => (
                                    <View key={i} style={styles.rowDispatchInfo} wrap={false}>
                                        <Text style={styles.row1DispatchInfo}>{row.label} </Text>
                                        <Text style={styles.row2DispatchInfo}>{row.info} </Text>
                                    </View>

                                ))}
                                <View style={[styles.rowDispatchInfo, styles.bold]}>
                                    <Text style={styles.footerDispatchInfo}></Text>
                                </View>
                            </View>



                            <View style={styles.table}>
                                <View style={[styles.rowDispatchInfo, styles.bold]}>
                                    <Text style={styles.header1DispatchInfo}>Lista de productos</Text>
                                </View>
                                <View style={[styles.rowProducts, styles.bold]}>
                                    <Text style={styles.header1Products}>Cantidad</Text>
                                    <Text style={styles.header3Products}>Descripción</Text>
                                    <Text style={styles.header4Products}>Precio unitario</Text>
                                    <Text style={styles.header5Products}>Total</Text>
                                </View>
                                {data.map((row, i) => (
                                    <View key={i} style={styles.rowProducts} wrap={false}>
                                        <Text style={styles.row1Products}>{row.quantity}</Text>
                                        <Text style={styles.row3Products}>{row.description}</Text>
                                        <Text style={styles.row4Products}>{row.unitPrice}</Text>
                                        <Text style={styles.row5Products}>{row.total}</Text>
                                    </View>
                                ))}
                                <View style={[styles.rowDispatchInfo, styles.bold]}>
                                    <Text style={styles.footerDispatchInfo}></Text>
                                </View>
                            </View>
                        </View>



                        <View style={styles.table}>
                            <View style={[styles.rowInfo, styles.bold, styles.header]}>
                                <Text style={styles.tableDummy}>
                                    <Text style={{color:"black", textAlign:"center", fontSize:11 }}>Comentarios :</Text>
                                    <Text style={styles.text1}></Text>
                                    <Text></Text>
                                    <Text style={styles.text1}></Text>
                                </Text>
                                <Text style={styles.row2Info}></Text>
                                <View style={styles.table}>
                                    {resumeAmounts.map((row, i) => (
                                        <View key={i} style={styles.rowProducts} wrap={false}>
                                            <Text style={styles.row1ResumeAmount}>{row.label}</Text>
                                            <Text style={styles.row2ResumeAmount}>{row.info}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        </View>
                        <Text style={styles.text4}>{"\n"}Firma recepción:{"\n"}</Text>
                        <Text style={styles.text4}>_________________________</Text>
                    </Page>
                </Document>
            </PDFViewer>
        </Fragment>
    );
}