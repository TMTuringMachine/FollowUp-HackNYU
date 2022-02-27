$(function () {
  const socket = io();

  $("form").submit(function (e) {
    e.preventDefault();
    const msg = $("#m").val();
    socket.emit("chat message", $("#m").val());
    $("#m").val("");
    return false;
  });

  socket.on("chat message", function (msg) {

    const jsonMsg = JSON.parse(msg);
    const operatorId = jsonMsg.operatorAccount;
    const clientId = jsonMsg.client;
    const theMessage = jsonMsg.message;
    const sequenceNumber = jsonMsg.sequence;
    const trimmedHash = "";
    // const trimmedHash = "runningHash: " + jsonMsg.runningHash.slice(0,6) + "..";
    const trimmedTimestamp = jsonMsg.timestamp.slice(0, 25);

    const topicId = document.getElementById("topic-id");
    const idString = topicId.innerHTML.substring(7, topicId.length);

    $("#messages").append(
      $("<li>").addClass("new-message").append(
        $("<div>").addClass("message").append(
          $("<p>").text(operatorId + "@" + clientId).addClass("client")).append(
            $("<div>").addClass("message-body").append(
              $("<div>").text(theMessage).addClass("message-content")).append(
                $("<div>").text(trimmedTimestamp).addClass("message-timestamp")))).append(
                  $("<div>").addClass("meta").append(
                    $("<p>").text("")).append(
                      // $("<p>").text("sequence: " + sequenceNumber).addClass("details")).append(
                      $("<p>").text(trimmedHash).addClass("details")).append(
                        $("<a>").text("view transaction").addClass("details")
                          .attr("target", "_blank")
                          .attr("href", `https://explorer.kabuto.sh/testnet/topic/${idString}/message/${sequenceNumber}`))));
    $("#sequence-number").text("last message sequence number: " + sequenceNumber + "  ");
  });

  socket.on("connect message", function (msg) {
    const connectMessage = JSON.parse(msg)
    $("#messages").append(
      $("<li>").text('').addClass(""));
      // $("<li>").text('new connection: ' + connectMessage.operatorAccount + "@" + connectMessage.client).addClass("new-connection"));
    const topicId = document.getElementById("topic-id");
  });

  socket.on("disconnect message", function (msg) {
    const disconnectMsg = JSON.parse(msg);
    $("#messages").append(
      $("<li>").text(disconnectMsg.operatorAccount + "@" + disconnectMsg.client + ' has disconnected').addClass("disconnection"));
  });
});
